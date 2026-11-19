import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './config/database.config';
import { envValidationSchema } from './config/env.validation';
import { AuthModule } from './modules/auth/authModule';
import { EmpresasModule } from './modules/empresas/empresasModule';
import { UsuariosModule } from './modules/usuarios/usuariosModule';
import { PortfolioModule } from './modules/portfolio/portfolioModule';
import { HealthController } from './modules/health/healthController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),

    AuthModule,
    EmpresasModule,
    UsuariosModule,
    PortfolioModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
