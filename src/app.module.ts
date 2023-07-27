import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimersModule } from './timers/timers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerEntriesModule } from './timer-entries/timer-entries.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TimersModule,
    TimerEntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
