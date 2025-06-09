 import { forwardRef, Global, Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module.js';
import { TemplateReadService } from './services/template-read.service.js';
import { TemplateWriteService } from './services/template-write.service.js';
import { TemplateQueryResolver } from './resolvers/template-query.resolver.js';
import { TemplateMutationResolver } from './resolvers/template-mutation.resolver.js';
import { ObservabilityModule } from '../observability/observability.module.js';

import { entities } from './models/entities/entities.entity.js';
import { KeycloakModule } from '../security/keycloak/keycloak.module.js';
import { MongooseModule } from '@nestjs/mongoose';


/**
 * Das Modul besteht aus allgemeinen Services, z.B. MailService.
 * @packageDocumentation
 */

/**
 * Die dekorierte Modul-Klasse mit den Service-Klassen.
 */
@Global()
    @Module({
        imports: [
            forwardRef(() => KafkaModule),
            ObservabilityModule,
            KeycloakModule,
            MongooseModule.forFeature(entities)
    ],
        providers: [
            TemplateQueryResolver,
            TemplateMutationResolver,
            TemplateReadService,
            TemplateWriteService
        ],
        exports: [
            TemplateReadService,
            TemplateWriteService
        ],
})
export class TemplateModule { }
