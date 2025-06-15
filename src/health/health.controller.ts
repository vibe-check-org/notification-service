import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { KafkaIndicator } from './kafka.indicator.js';
import { HttpExceptionFilter } from '../notification/utils/http-exception.filter.js';
import { ResponseTimeInterceptor } from '../logger/response-time.interceptor.js';
import { Public } from '../security/keycloak/decorators/public.decorator.js';
import { InjectConnection } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';

@Controller('health')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
export class HealthController {
  readonly #health: HealthCheckService;
  readonly #mongoose: MongooseHealthIndicator;
  readonly #kafka: KafkaIndicator;
  readonly #conn: Connection;

  constructor(
    @InjectConnection() conn: Connection,
    health: HealthCheckService,
    mongoose: MongooseHealthIndicator,
    kafka: KafkaIndicator,
  ) {
    this.#conn = conn;
    this.#health = health;
    this.#mongoose = mongoose;
    this.#kafka = kafka;
  }

  @Get()
  status() {
    return {
      ready: this.#conn.readyState, // 1 = connected
      name: this.#conn.name,
      host: this.#conn.host,
    };
  }

  @Get('liveness')
  @HealthCheck()
  @Public()
  liveness() {
    return this.#health.check([
      () => Promise.resolve({ app: { status: 'up' } }),
    ]);
  }

  @Get('readiness')
  @HealthCheck()
  @Public()
  readiness() {
    return this.#health.check([
      () => this.#mongoose.pingCheck('mongoDB'),
      () => this.#kafka.isHealthy(),
    ]);
  }
}
