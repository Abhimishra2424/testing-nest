import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Note } from 'src/note/note.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  age: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Note)
  notes: Note[];
}
