import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendNotificationInput {
    @Field()
    email: string;

    @Field()
    subject: string;

    @Field()
    message: string;
}
