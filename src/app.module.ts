import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { NoteModule } from './note/note.module';
import { Note } from './note/note.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [User, Note],
      autoLoadModels: true,
      synchronize: true,
      sync: { force: false },
    }),
    UsersModule,
    NoteModule,
  ],
})
export class AppModule {}
