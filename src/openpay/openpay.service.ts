import { Injectable } from '@nestjs/common';
import * as Openpay from 'openpay';
import { IChargeRequestBank, IChargeRequestCard, IChargeRequestCash } from 'src/pagos-pasarela/interfaces/pagoPasarela';
import { ICreateWebHook } from 'src/webhook/interfaces/CreateWebHook';

// interface ICreateWebHook {
//   id: string;
//   url: string;
//   user: string;
//   password: string;
//   event_types: string[];
//   status: string;
// }

@Injectable()
export class OpenpayService {
    private openpay;

    constructor() {
      // Configurar OpenPay con tus credenciales
      console.log('process.env.OPENPAY_ID', process.env.OPENPAY_ID)
        this.openpay = new Openpay();
        this.openpay.setMerchantId('m8qrwxynurdz6r7m9p4i');
        this.openpay.setPrivateKey('sk_bd7bceeb812e45e8b79d579da88da702');
        this.openpay.setProductionReady(false);

        console.log('openpay obj', this.openpay);
    }
  
    async createCharge(chargeData: IChargeRequestCash | IChargeRequestCard | IChargeRequestBank): Promise<any> {
      return new Promise((resolve, reject) => {
        this.openpay.charges.create(chargeData, (error, charge) => {
          if (error) {
            console.error('Error al crear el cargo:', error);
            return reject(error);
          }
          console.log('Cargo exitoso:', charge);
          resolve(charge);
        });
      });
    }

    async createWebHook(webhook: ICreateWebHook): Promise<any> {
      return new Promise((resolve, reject) => {
        this.openpay.webhooks.create(webhook, (error, webhook) => {
          if (error) {
            console.error('Error al crear el webhook:', error);
            return reject(error);
          }
          console.log('Webhook creado correctamente:', webhook);
          resolve(webhook);
        }); 
      });
    }

    async deleteWebHook(webhookId: string): Promise<any> {
      return new Promise((resolve, reject) => {
        this.openpay.webhooks.delete(webhookId, (error) => {
          if (error) {
            console.error('Error al eliminar el webhook:', error);
            return reject(error);
          }
          console.log('Webhook eliminado correctamente:', webhookId);
          resolve(webhookId);
        }); 
      });
    }

    async getAllWebHooks(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.openpay.webhooks.list(function(error, list){
          if (error) {
            console.error('Error al obtener webhooks', error);
            return reject(error);
          }
          console.log('Webhooks:', list);
          resolve(list)
        })
      });
    }

}
