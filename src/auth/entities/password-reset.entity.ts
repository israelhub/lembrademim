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

@Table({
  tableName: 'password_reset',
  timestamps: true,
})
export class PasswordReset extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number;

  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare code: string;

  @Column(DataType.DATE)
  declare expiresAt: Date;

  @Column(DataType.BOOLEAN)
  declare isUsed: boolean;

  @BelongsTo(() => User)
  user: User;
}
