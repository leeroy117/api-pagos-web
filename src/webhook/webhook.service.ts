import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenpayService } from 'src/openpay/openpay.service';
import { ICreateWebHook } from './interfaces/CreateWebHook';

@Injectable()
export class WebhookService {
    constructor(private readonly openPayService: OpenpayService) {
        
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
                'payout.created',
                'payout.succeeded',
                'payout.failed',
                'spei.received',
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
        const response = await this.openPayService.getAllWebHooks();
        console.log("🚀 ~ WebhookService ~ getAllWebHooks ~ response:", response)
        return response;
    }
    

    
}
