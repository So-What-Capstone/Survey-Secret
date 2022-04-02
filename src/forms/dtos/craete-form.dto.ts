import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Form } from '../schemas/form.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateFormInput extends PickType(Form, ['title', 'description']) {}

@ObjectType()
export class CreateFormOutput extends CoreOutput {}
