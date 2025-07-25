import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'folder', timestamps: false })
export class Folder extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  user: User;
}
