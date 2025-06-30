import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import axios from 'axios';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import { LoggerPlus } from '../../observability/logger-plus.js';
import { LoggerService } from '../../observability/logger.service.js';
import { TraceContext } from '../../observability/trace-context.util.js';
import { TemplateReadService } from '../../template/services/template-read.service.js';
import { convert } from 'html-to-text';
import { KafkaConsumerService } from '../../kafka/kafka-consumer.service.js';
import { getKafkaTopicsBy } from '../../kafka/kafka-topic.properties.js';
// import { PlaceholderInput } from '../models/inputs/send-mail.input.js';


type MailProvider = 'gmail' | 'outlook' | 'smtp' | 'brevo';

@Injectable()
export class MailerService {
    readonly #templateReadService: TemplateReadService;
    readonly #logger: LoggerPlus;
    readonly #provider: MailProvider;
    readonly #transporter?: Transporter;
    readonly #kafkaConsumerService: KafkaConsumerService;

    constructor(
        templateReadService: TemplateReadService,
        loggerService: LoggerService,
        kafkaConsumerService: KafkaConsumerService,
    ) {
        this.#templateReadService = templateReadService;
        this.#logger = loggerService.getLogger(MailerService.name);
        this.#provider = (process.env.MAIL_PROVIDER || 'smtp') as MailProvider;
        this.#kafkaConsumerService = kafkaConsumerService;

        if (this.#provider !== 'brevo') {
            this.#transporter = nodemailer.createTransport(this.#getSmtpOptions());
        }
    }

    async onModuleInit(): Promise<void> {
        await this.#kafkaConsumerService.consume(
            { topics: getKafkaTopicsBy(['user']), },
        );

    }
    

    async sendMailUsingTemplate(
        templateType: string,
        toEmail: string,
        placeholders: Record<string, string>,
        traceContext?: TraceContext,
    ): Promise<void> {
        const tracer = trace.getTracer('mailer');
        const span = tracer.startSpan(`mail.send.${templateType}`);

        try {
            // const { templateType, placeholders, toEmail } = data;
            // const mappedPlaceholders = this.#convertPlaceholders(placeholders);

            const template = await this.#templateReadService.findByType(templateType);
            if (!template) throw new Error(`Kein Template mit Typ "${templateType}" gefunden`);

            const subject = this.#replacePlaceholders(template.subject, placeholders);
            const body = this.#replacePlaceholders(template.body, placeholders);

            const fromEmail = `"GentleCorp" <${this.#getFromUser()}>`;

            if (this.#provider === 'brevo') {
                await this.#sendViaBrevo(
                    //fromEmail,
                    toEmail,
                    "n/a",
                    subject,
                    body,
                    template.isHtml === true
                );
            } else {
                const isHtml = template.isHtml === true;
                const fullName = `${placeholders['lastName'] ?? ''} ${placeholders['firstName'] ?? ''}`.trim() || 'Unbekannter Benutzer';

                this.#logger.debug(`Sende Mail an ${toEmail} mit Betreff "${subject}" und Platzhaltern: %o`, placeholders);
                this.#logger.debug(`Mail-Body: ${isHtml ? 'HTML' : 'Text'}\n${body}`);
                await this.#transporter!.sendMail({
                    from: fromEmail,
                    to: `${fullName} <${toEmail}>`,
                    subject,
                    text: isHtml ? convert(body, { wordwrap: 130 }) : body,
                    ...(isHtml ? { html: body } : {}),
                });
            }

            this.#logger
                .withContext(traceContext)
                .info(`Mail vom Typ "${templateType}" erfolgreich an ${toEmail} gesendet`);
            span.setStatus({ code: SpanStatusCode.OK });
        } catch (err) {
            span.recordException(err as Error);
            span.setStatus({ code: SpanStatusCode.ERROR, message: (err as Error).message });
            this.#logger.withContext(traceContext).error('Fehler beim Mailversand: %o', err);
            throw err;
        } finally {
            span.end();
        }
    }

    async sendMail(
        templateType: string,
        toEmail: string,
        toName: string,
        placeholders: Record<string, string>,
        traceContext?: TraceContext,
    ): Promise<void> {
        const tracer = trace.getTracer('mailer');
        const span = tracer.startSpan(`mail.send.${templateType}`);

        try {
            const template = await this.#templateReadService.findByType(templateType);
            if (!template) throw new Error(`Kein Template mit Typ "${templateType}" gefunden`);

            const subject = this.#replacePlaceholders(template.subject, placeholders);
            const body = this.#replacePlaceholders(template.body, placeholders);

            const fromEmail = `"GentleCorp" <${this.#getFromUser()}>`;

            if (this.#provider === 'brevo') {
                await this.#sendViaBrevo(
                    //fromEmail,
                    toEmail,
                    toName,
                    subject,
                    body,
                    template.isHtml === true
                );
            } else {
                const isHtml = template.isHtml === true;

                this.#logger.info(`Sende Mail an ${toEmail} mit Betreff "${subject}" und Platzhaltern: %o`, placeholders);
                this.#logger.info(`Mail-Body: ${isHtml ? 'HTML' : 'Text'}\n${body}`);

                await this.#transporter!.sendMail({
                    from: fromEmail,
                    to: `${toName} <${toEmail}>`,
                    subject,
                    text: isHtml ? convert(body, { wordwrap: 130 }) : body,
                    ...(isHtml ? { html: body } : {}),
                });

            }

            this.#logger
                .withContext(traceContext)
                .info(`Mail vom Typ "${templateType}" erfolgreich an ${toEmail} gesendet`);
            span.setStatus({ code: SpanStatusCode.OK });
        } catch (err) {
            span.recordException(err as Error);
            span.setStatus({ code: SpanStatusCode.ERROR, message: (err as Error).message });
            this.#logger.withContext(traceContext).error('Fehler beim Mailversand: %o', err);
            throw err;
        } finally {
            span.end();
        }
    }

    #replacePlaceholders(text: string, values: Record<string, string>): string {
        return text.replace(/{{\s*(.*?)\s*}}/g, (_, key) => values[key.trim()] ?? `{{${key.trim()}}}`);
    }

    // #convertPlaceholders(placeholders: PlaceholderInput[]): Record<string, string> {
    //     return Object.fromEntries(placeholders.map(({ key, value }) => [key, value]));
    // }

    #getSmtpOptions(): SMTPTransport.Options {
        switch (this.#provider) {
            case 'gmail':
                return {
                    service: 'gmail',
                    auth: {
                        user: process.env.MAIL_GMAIL_USER,
                        pass: process.env.MAIL_GMAIL_PASS,
                    },
                };
            case 'outlook':
                return {
                    host: 'smtp.office365.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_OUTLOOK_USER,
                        pass: process.env.MAIL_OUTLOOK_PASS,
                    },
                };
            
            case 'brevo':
                return {
                    host: 'smtp-relay.brevo.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_BREVO_USER!,
                        pass: process.env.MAIL_BREVO_PASS!,
                    },
                };
            
            case 'smtp':
            default:
                return {
                    host: process.env.MAIL_SMTP_HOST,
                    port: Number(process.env.MAIL_SMTP_PORT) || 587,
                    secure: process.env.MAIL_SMTP_SECURE === 'true',
                    auth: {
                        user: process.env.MAIL_SMTP_USER,
                        pass: process.env.MAIL_SMTP_PASS,
                    },
                };
        }
    }

    #getFromUser(): string {
        switch (this.#provider) {
            case 'gmail': return process.env.MAIL_GMAIL_USER!;
            case 'outlook': return process.env.MAIL_OUTLOOK_USER!;
            case 'smtp': return process.env.MAIL_SMTP_USER!;
            case 'brevo': return process.env.MAIL_BREVO_USER!;
            default: throw new Error('Unbekannter Mailprovider');
        }
    }

    async #sendViaBrevo(toEmail: string, toName: string, subject: string, content: string, isHtml: boolean) {
        const apiKey = process.env.MAIL_BREVO_API_KEY;
        const sender = { name: 'GentleCorp', email: this.#getFromUser() };

        const htmlContent = isHtml ? content : undefined;
        const textContent = isHtml ? convert(content, { wordwrap: 130 }) : content;

        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender,
                to: [{ email: toEmail, name: toName }],
                subject,
                textContent,
                ...(htmlContent ? { htmlContent } : {}),
            },
            {
                headers: {
                    'api-key': apiKey!,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );

        this.#logger.debug('📬 Brevo API Response:', response.data);
    }
}
