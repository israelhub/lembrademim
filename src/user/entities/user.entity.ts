import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;
}
