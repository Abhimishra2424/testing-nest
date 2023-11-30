import { Injectable } from '@nestjs/common';
import { Note } from './note.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNoteDto, UpdateNoteDto } from './dto/create-note.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note) private readonly noteModel: typeof Note) {}

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteModel.create({
      note: createNoteDto.note,
      userId: createNoteDto.userId,
    });
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.findAll({
      include: [User], // Include the Note model
    });
  }

  findOne(id: string): Promise<Note> {
    return this.noteModel.findOne({
      where: {
        id,
      },
      include: [User], // Include the Note model
    });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    if (note) {
      await this.noteModel.update(updateNoteDto, { where: { id } });
      return await this.findOne(id);
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
