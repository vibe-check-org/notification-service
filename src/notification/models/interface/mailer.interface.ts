export interface MailPayload {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export interface Mailer {
    sendMail(payload: MailPayload): Promise<void>;
}
