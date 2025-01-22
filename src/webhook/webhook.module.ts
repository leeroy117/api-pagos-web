import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { OpenpayService } from 'src/openpay/openpay.service';

@Module({
  imports: [],
  providers: [WebhookService, OpenpayService],
  controllers: [WebhookController]
})
export class WebhookModule {}
