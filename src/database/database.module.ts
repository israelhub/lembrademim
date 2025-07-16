import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('PGHOST'),
        port: 5432, // Porta padrão do PostgreSQL
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        autoLoadModels: true,
        synchronize: true,
        alter: true, // Permite alterações na estrutura existente
        define: {
          underscored: true,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
