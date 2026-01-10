import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [ QuestionsModule, ResultsModule],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
