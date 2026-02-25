import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { ResultsModule } from './results/results.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';

@Module({
  imports: [ QuestionsModule, ResultsModule, AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    StudentModule,
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
