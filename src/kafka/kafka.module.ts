// Pfad: src/kafka/kafka.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { KafkaConsumerService } from './kafka-consumer.service.js';
import { KafkaEventDispatcherService } from './kafka-event-dispatcher.service.js';
import { KafkaProducerService } from './kafka-producer.service.js';
import { KafkaHeaderBuilder } from './kafka-header-builder.js';
import { ObservabilityModule } from '../observability/observability.module.js';
import { NotificationModule } from '../notification/notification.module.js';
import { VibeprofileCreatedHandler } from './handlers/vibeprofile-created.handler.js';
import { DeletedCustomerHandler } from './handlers/delete-customer.handler.js';
import { ShutdownHandler } from './handlers/shutdown.handler.js';


@Module({
    imports: [
        DiscoveryModule,
        forwardRef(() => NotificationModule),
        forwardRef(() => ObservabilityModule),
    ],
    providers: [
        KafkaProducerService,
        KafkaConsumerService,
        KafkaEventDispatcherService,
        KafkaHeaderBuilder,

        // Kafka-Handler
        VibeprofileCreatedHandler,
        DeletedCustomerHandler,
        ShutdownHandler,
        // AccountCreatedHandler,
        // AccountDeletedHandler,
        // ShoppingCartCreatedHandler,
        // ShoppingCartDeletedHandler,
    ],
    exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule { }
