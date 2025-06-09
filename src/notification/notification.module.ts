// src/notification/notification.module.ts

import { Module } from '@nestjs/common';
import { MailerService } from './services/mailer.service.js';
import { TemplateModule } from '../template/template.module.js';
import { ObservabilityModule } from '../observability/observability.module.js';
import { NotificationResolver } from './resolvers/notification.resolver.js';
import { KeycloakModule } from '../security/keycloak/keycloak.module.js';
import { KafkaModule } from '../kafka/kafka.module.js';

/**
 * Das Modul besteht aus Services für Mail.
 * @packageDocumentation
 */

/**
 * Die dekorierte Modul-Klasse mit den Service-Klassen.
 */
@Module({
    imports: [
        KafkaModule,
        KeycloakModule,
        TemplateModule,
        ObservabilityModule,
    ],
    providers: [
        MailerService,
        NotificationResolver,
    ],
    exports: [
        MailerService,
        NotificationResolver,
    ],
})
export class NotificationModule { }