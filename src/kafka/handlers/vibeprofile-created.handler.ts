import { MailerService } from "../../notification/services/mailer.service.js";
import { KafkaHandler } from "../decorators/kafka-event.decorator.js";

@KafkaHandler('vibeprofile.created')
export class VibeprofileCreatedHandler {
    readonly #mailer: MailerService

    constructor(mailer: MailerService) {
        this.#mailer = mailer;
     }

    async handle(event: { userId: string; email: string; vorname: string }) {
        await this.#mailer.sendMailUsingTemplate('vibeprofile.created', event.email, {
            vorname: event.vorname,
            profilLink: `https://vibecheck.app/profile/${event.userId}`,
        });
    }
}
