import { ApolloFederationDriverConfig } from '@nestjs/apollo';
import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AdminModule } from './admin/admin.module.js';
import { DevModule } from './config/dev/dev.module.js';
import { LoggerModule } from './logger/logger.module.js';
import { RequestLoggerMiddleware } from './logger/request-logger.middleware.js';
import { KafkaModule } from './kafka/kafka.module.js';
import { KeycloakModule } from './security/keycloak/keycloak.module.js';
import { graphQlModuleOptions2 } from './config/graphql.js';
import { NotificationModule } from './notification/notification.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from './config/mongo.config.js';
import { TemplateModule } from './template/template.module.js';
import { ObservabilityModule } from './observability/observability.module.js';

@Module({
  imports: [
    AdminModule,
    DevModule,
    NotificationModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(graphQlModuleOptions2),
    MongooseModule.forRoot(database.databaseUri, {
      dbName: database.databaseName,
    }),
    LoggerModule,
    KafkaModule,
    TemplateModule,
    ObservabilityModule,
    KeycloakModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('auth', 'graphql');
  }
}
