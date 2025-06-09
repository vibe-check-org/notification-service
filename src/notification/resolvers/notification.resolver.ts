import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { getLogger } from '../../logger/logger.js';
import { Roles } from 'nest-keycloak-connect';
import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { HttpExceptionFilter } from '../utils/http-exception.filter.js';
import { KeycloakService } from '../../security/keycloak/keycloak.service.js';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';
import { SendMailInput } from '../models/inputs/send-mail.input.js';
import { MailerService } from '../services/mailer.service.js';

/**
 * GraphQL-Resolver für manuelle Benachrichtigungen via E-Mail.
 */
@Resolver()
@UseGuards(KeycloakGuard)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
export class NotificationResolver {
    readonly #logger = getLogger(NotificationResolver.name);
    readonly #keycloakService: KeycloakService;
    readonly #mailerService: MailerService;

    constructor(
        keycloakservice: KeycloakService,
        mailerService: MailerService
    ) {
        this.#keycloakService = keycloakservice;
        this.#mailerService = mailerService;
    }

    @Mutation(() => Boolean)
    @Roles({ roles: ['Admin'] })
    async sendMail(
        @Args('input') input: SendMailInput,
    ): Promise<boolean> {
        const placeholders = Object.fromEntries(
            input.placeholders.map(p => [p.key, p.value])
        );

        await this.#mailerService.sendMail(
            input.templateType,
            input.toEmail,
            input.toName,
            placeholders
        );

        return true;
    }

    @Query(() => String)
    @Roles({ roles: ['Admin', 'User'] })
    async healthCheck(
        @Context() context: any,
    ) {
        try {
            const { username } = await this.#keycloakService.getToken(context);
            this.#logger.debug('healthCheck: username=%s', username);
            return 'NotificationService OK';
        } catch (error) {
            if (error instanceof Error) {
                console.error('Fehler:', error.message);
                throw new Error('Fehler beim Senden: ' + error.message);
            } else {
                console.error('Unbekannter Fehler:', error);
                throw new Error('Unbekannter Fehler aufgetreten');
            }

        }
    }
}
