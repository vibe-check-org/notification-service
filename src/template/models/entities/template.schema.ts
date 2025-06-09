import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Dokument für Nachrichtenvorlagen in der Datenbank.
 * Speichert z. B. Willkommensnachricht, Passwort-Reset etc.
 */
@Schema({ timestamps: true, collection: 'templates' })
@ObjectType()
export class Template {
    @Field()
    get id(): string {
        return (this as any)._id?.toString();
    }

    @Field()
    @Prop({ required: true, unique: true })
    type: string;

    @Field()
    @Prop({ required: true, unique: true })
    name: string;

    @Field()
    @Prop({ required: true })
    subject: string;

    @Field()
    @Prop({ required: true })
    body: string;

    @Field(() => [String])
    @Prop({ default: [] })
    placeholders: string[];

    @Field(() => [Boolean])
    @Prop({ required: true })
    isHtml: boolean;

}

export type TemplateDocument = Template & Document;
export const TemplateSchema = SchemaFactory.createForClass(Template);

// versionKey deaktivieren
TemplateSchema.set('versionKey', false);


// {
//     "_id": "...",
//         "type": "USER_REGISTERED",
//             "subject": "Willkommen bei GentleCorp, {{name}}!",
//                 "body": "Hallo {{name}},\n\nvielen Dank für deine Registrierung.\n\nLiebe Grüße,\nDein GentleCorp-Team"
// }
