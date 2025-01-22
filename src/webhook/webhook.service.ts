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
            url: 'https://www.google.com.mx',
            'user' : 'dt_pagos@academiaglobal.mx',
            'password' : 'fZK9+dFv)Uc5.',
            event_types: [

            ]
        }


        const response = await this.openPayService.createWebHook(webhook);
        console.log("🚀 ~ WebhookService ~ createWebhookPaynet ~ response:", response)

        return response;
    }

    
}
