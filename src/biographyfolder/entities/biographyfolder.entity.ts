import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { Biography } from 'src/biography/entities/biography.entity';
import { Folder } from 'src/folder/entities/folder.entity';

@Table({ tableName: 'biography_folder', timestamps: false })
export class Biographyfolder extends Model {
  @PrimaryKey
  @ForeignKey(() => Biography)
  @Column(DataType.BIGINT)
  declare biographyId: number;

  @PrimaryKey
  @ForeignKey(() => Folder)
  @Column(DataType.INTEGER)
  declare folderId: number;

  @BelongsTo(() => Biography)
  biography: Biography;

  @BelongsTo(() => Folder)
  folder: Folder;

  // Método auxiliar para garantir acesso à biografia
  getBiography(): Biography | null {
    // @ts-ignore
    return (
      this.biography || (this.dataValues && this.dataValues.biography) || null
    );
  }

  // Método auxiliar para garantir acesso à pasta
  getFolder(): Folder | null {
    // @ts-ignore
    return this.folder || (this.dataValues && this.dataValues.folder) || null;
  }
}
