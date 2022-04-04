import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './schemas/form.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { FormsResolver } from './forms.resolver';
import { Section, SectionSchema } from './schemas/section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Form.name,
        schema: FormSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Section.name,
        schema: SectionSchema,
      },
    ]),
  ],
  providers: [FormsService, FormsResolver],
  exports: [FormsService],
})
export class FormsModule {}
