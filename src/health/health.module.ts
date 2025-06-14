import { Module } from '@nestjs/common';
import { MongooseHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller.js';
import { KafkaIndicator } from './kafka.indicator.js';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.health.env',
      isGlobal: true,
    }),
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthController],
  providers: [KafkaIndicator, MongooseHealthIndicator],
})
export class HealthModule {}
