import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ timestamps: false, tableName: 'biography' })
export class Biography extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column(DataType.STRING)
  declare cellphoneNumber: string;

  @Column(DataType.DATEONLY)
  declare birthDate: Date;

  @Column(DataType.ARRAY(DataType.STRING))
  declare tags: string[];

  @Column(DataType.TEXT)
  declare notes: string;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  declare userId: number;

  @BelongsTo(() => User)
  user: User;
}
