import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MessageModule } from '../message/message.module';
import { MessageEvent } from './events';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),
    MessageModule
  ],
  providers: [MessageEvent],
})
export class EventsModule { }
