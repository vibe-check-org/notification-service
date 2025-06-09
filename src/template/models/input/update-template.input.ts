import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTemplateInput } from './create-template.input.js';

@InputType()
export class UpdateTemplateInput extends PartialType(CreateTemplateInput) { }
