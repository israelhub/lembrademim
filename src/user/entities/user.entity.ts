import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Biography } from 'src/biography/entities/biography.entity';
import { Folder } from 'src/folder/entities/folder.entity';

@Table({
  tableName: 'user',
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare password: string;

  @HasMany(() => Biography)
  biographys: Biography[];

  @HasMany(() => Folder)
  folders: Folder[];
}
