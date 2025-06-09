 import { forwardRef, Global, Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module.js';
import { TraceContextProvider } from './trace-context.provider.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TraceInterceptor } from './trace.interceptor.js';
import { LoggerService } from './logger.service.js';


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
    ],
        providers: [
            TraceContextProvider,
            LoggerService,
            {
                provide: APP_INTERCEPTOR,
                useClass: TraceInterceptor,
            },
        ],
        exports: [
            TraceContextProvider,
            LoggerService,
        ],
})
export class ObservabilityModule { }
