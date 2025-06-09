import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendMailInput {
    @Field()
    templateType: string;

    @Field()
    toEmail: string;

    @Field()
    toName: string;

    @Field(() => [PlaceholderInput])
    placeholders: PlaceholderInput[];
}

@InputType()
export class PlaceholderInput {
    @Field()
    key: string;

    @Field()
    value: string;
}
