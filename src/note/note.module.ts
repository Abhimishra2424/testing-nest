import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Note } from './note.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
