import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SSHService } from './ssh/ssh.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfigAWS, getTypeOrmConfigDO } from './providers/typeorm.config';
import { SshModule } from './ssh/ssh.module';
// import { DO_DB_HOST, DO_DB_PASSWORD, DO_DB_PORT, DO_DB_USERNAME, DO_SSH_HOST, DO_SSH_PASSWORD, DO_SSH_PORT, DO_SSH_USERNAME } from './constants';
import { ConfigModule } from '@nestjs/config';
import { PagosPasarelaModule } from './pagos-pasarela/pagos-pasarela.module';
import { DatabaseModule } from './database/database.module';
import { ServicioModule } from './servicio/servicio.module';
import { UsersModule } from './users/users.module';
import { OpenpayService } from './openpay/openpay.service';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PagosPasarelaModule,
    DatabaseModule,
    ServicioModule,
    UsersModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenpayService],
})
export class AppModule {}
