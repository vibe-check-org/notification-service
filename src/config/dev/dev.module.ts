import { MongooseModule } from '@nestjs/mongoose';
import { KeycloakModule } from '../../security/keycloak/keycloak.module.js';
import { DevController } from './dev.controller.js';
import { Module } from '@nestjs/common';
import { TemplateSeederService } from './template-seeder.service.js';
import { NotificationModule } from '../../notification/notification.module.js';
import { entities } from '../../template/models/entities/entities.entity.js';


@Module({
  imports: [KeycloakModule, MongooseModule.forFeature(entities), NotificationModule],
  controllers: [DevController],
  providers: [TemplateSeederService],
  exports: [TemplateSeederService,],
})
export class DevModule {}
