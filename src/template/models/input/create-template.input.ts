import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTemplateInput {
    @Field()
    type: string;

    @Field()
    key: string;

    @Field()
    subject: string;

    @Field()
    body: string;

    @Field(() => [String])
    placeholders: string[];
}
