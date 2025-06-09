

/**
 * Entity-Klasse für Abbildung ohne TypeORM.
 */
export class SendMailDTO {
    readonly email: string;
    readonly placeholders: Record<string, string>
}


