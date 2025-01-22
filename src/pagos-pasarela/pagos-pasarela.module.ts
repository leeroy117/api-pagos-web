import { Module } from '@nestjs/common';
import { PagosPasarelaController } from './pagos-pasarela.controller';
import { PagosPasarelaService } from './pagos-pasarela.service';
import { DatabaseModule } from 'src/database/database.module';
import { OpenpayService } from 'src/openpay/openpay.service';

@Module({
  imports:[DatabaseModule],
  controllers: [PagosPasarelaController],
  providers: [PagosPasarelaService, OpenpayService]
})
export class PagosPasarelaModule {}
