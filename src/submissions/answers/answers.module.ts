import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';

import { SubmissionsModule } from '../submissions.module';
import { QuestionsModule } from '../../forms/questions/questions.module';

@Module({
  imports: [SubmissionsModule, QuestionsModule],
  providers: [AnswersService, AnswersResolver],
  exports: [AnswersService],
})
export class AnswersModule {}
