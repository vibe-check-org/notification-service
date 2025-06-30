import { MailerService } from "../../notification/services/mailer.service.js";
import { KafkaEvent } from "../decorators/kafka-event.decorator.js";
import jwt from 'jsonwebtoken';
import { KafkaTopics } from "../kafka-topic.properties.js";
import { Injectable } from "@nestjs/common";
import { KafkaEventHandler } from "../interface/kafka-event.interface.js";

@KafkaEvent(KafkaTopics.user.created)
@Injectable()
export class VibeprofileCreatedHandler implements KafkaEventHandler {
    readonly #mailer: MailerService

    constructor(mailer: MailerService) {
        this.#mailer = mailer;
     }

    async handle(event: { userId: string; email: string; username: string }) {
        const token = jwt.sign(
            { userId: event.userId },
            process.env.EMAIL_VERIFICATION_SECRET,
            { expiresIn: '1d' }
        );
 
        await this.#mailer.sendMailUsingTemplate('vibeprofile.created', event.email, {
            username: event.username,
            verifyLink: `${process.env.USER_CLIENT}/verify-email?token=${token}`,
            year: new Date().getFullYear() as unknown as string,
        });
    }
}
