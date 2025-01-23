import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { OpenpayService } from 'src/openpay/openpay.service';
import { ICreateWebHook } from './interfaces/CreateWebHook';
import { IChargeOpenPayWebHook } from './interfaces/ResponseWebHook';
import { DataSource } from 'typeorm';
import { PagoPasarela } from 'src/entity/PagoPasarela';
import { Pago } from 'src/entity/Pago';

@Injectable()
export class WebhookService {
    constructor(
            private readonly openPayService: OpenpayService,
            @InjectDataSource('DO') private readonly dataSource: DataSource,
        ) {
        
    }

    async createWebhookPaynet() {

        const webhook: ICreateWebHook = {
            url: 'https://api-pagos-web-ag-5c0295b9da40.herokuapp.com/webhook/receive',
            'user' : 'dt_pagos@academiaglobal.mx',
            'password' : 'fZK9+dFv)Uc5.',
            event_types: [
                'charge.created',
                'charge.refunded',
                'charge.failed',
                'charge.succeeded',
                'charge.cancelled',
                'chargeback.accepted',
            ]
        }


        const response = await this.openPayService.createWebHook(webhook);
        console.log("🚀 ~ WebhookService ~ createWebhookPaynet ~ response:", response)

        return response;
    }

    async deleteWebHook(webHookId: string) {
        const response = await this.openPayService.deleteWebHook(webHookId);
        console.log("🚀 ~ WebhookService ~ deleteWebHook ~ response:", response)
        return response;
    }

    async getAllWebHooks() {
        // const queryRunner = this.dataSource.createQueryRunner();
        
        // try {
        //     await queryRunner.connect();
        //     await queryRunner.startTransaction();

        //     const idTransaction = 'trpkuavcyubq19wezerqaaaa';

        //     const transactionInfo = await queryRunner.manager.find(PagoPasarela, {
        //         where: {
        //             idTransaction: idTransaction,
        //         }
        //     });
        //     console.log("🚀 ~ WebhookService ~ receiveWebhook ~ transactionInfo:", transactionInfo)

        //     await queryRunner.commitTransaction();
        //     return transactionInfo;
        //     // return newTransaction;
        // }catch(error) {
        //     await queryRunner.rollbackTransaction();
        //     throw error;
        // } finally {
        //     await queryRunner.release();
        // }

        const response = await this.openPayService.getAllWebHooks();
        console.log("🚀 ~ WebhookService ~ getAllWebHooks ~ response:", response)
        return response;
    }

    // *****************************************************************
    async receiveWebhook(data: IChargeOpenPayWebHook ){
        const idTransaction = data.transaction.id;

        
        // if(data.type !== 'charge.succeeded'){
        //     return "ok"
        // }

        // Aquí se podría hacer una llamada a la API para actualizar el estado del pago
        const queryRunner = this.dataSource.createQueryRunner();
        
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const newTransaction = queryRunner.manager.update(PagoPasarela, idTransaction, {
                status: data.transaction.status,
                fechaActualizacion: data.transaction.operation_date,
            });

            const transactionInfo = await queryRunner.manager.find(PagoPasarela, {
                where: {
                    idTransaction: idTransaction,
                }
            });

            if(transactionInfo.length == 0){
                throw new NotFoundException('No se encontro el id de la transacción.');
            }

            console.log("🚀 ~ WebhookService ~ receiveWebhook ~ transactionInfo:", transactionInfo)

            const newPaymentAG = queryRunner.manager.create(Pago, {
                idAlumno: transactionInfo[0].idAlumno,
                monto: data.transaction.amount,
                fechaRegistro: data.transaction.operation_date,
                idServicio: transactionInfo[0].idServicio,
                estatus: 1,
                deuda: 0,
                // Pago por plataforma es 5
                idTipo: 5,
            });
            const newPaymentAGResponse = await queryRunner.manager.save(Pago, newPaymentAG);

            await queryRunner.commitTransaction();
            return "ok";
            // return newTransaction;
        }catch(error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

    }

    

    
}
