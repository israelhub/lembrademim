import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PasswordReset } from './entities/password-reset.entity';
import { Op } from 'sequelize';

@Injectable()
export class PasswordResetRepository {
  constructor(
    @InjectModel(PasswordReset)
    private readonly passwordResetModel: typeof PasswordReset,
  ) {}

  async create(
    userId: number,
    email: string,
    code: string,
    expiresAt: Date,
  ): Promise<PasswordReset> {
    return await this.passwordResetModel.create({
      userId,
      email,
      code,
      expiresAt,
      isUsed: false,
    });
  }

  async findValidCode(email: string, code: string): Promise<PasswordReset | null> {
    return await this.passwordResetModel.findOne({
      where: {
        email,
        code,
        isUsed: false,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });
  }

  async markAsUsed(id: number): Promise<void> {
    await this.passwordResetModel.update(
      { isUsed: true },
      { where: { id } },
    );
  }

  async deleteExpiredCodes(): Promise<number> {
    return await this.passwordResetModel.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date(),
        },
      },
    });
  }

  async deleteUsedCodes(email: string): Promise<number> {
    return await this.passwordResetModel.destroy({
      where: {
        email,
        isUsed: false,
      },
    });
  }
}
