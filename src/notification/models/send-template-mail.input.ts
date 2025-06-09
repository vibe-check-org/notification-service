// src/notification/dto/send-template-mail.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { TraceContext } from '../../observability/trace-context.util.js';

/**
 * Input DTO zum Versenden einer templategestützten Mail.
 */
@InputType()
export class SendTemplateMailInput {
    @Field()
    to!: string;

    @Field()
    type!: string;

    @Field(() => String, { nullable: true })
    traceId?: string;

    @Field(() => String, { nullable: true })
    spanId?: string;

    @Field(() => String, { nullable: true })
    service?: string;

    @Field(() => Object)
    placeholders!: Record<string, string>;

    /**
     * Interne TraceContext-Weitergabe (nicht in GraphQL sichtbar).
     */
    traceContext?: TraceContext;
}
