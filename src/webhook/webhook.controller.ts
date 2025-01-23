import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Request } from 'express';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly serviceWebHook: WebhookService) {

    }

    @Get()
    createWebhookPaynet() {
        this.serviceWebHook.createWebhookPaynet();
    }

    @Post('receive')
    paynetResponse(@Req() request: Request) {
        console.log("🚀 ~ WebhookController ~ paynetResponse ~ request:", request)
        console.log('body',request.body);
    }

    @Delete(':id')
    async deleteWebHook(@Param('id') id: string) {
        console.log("🚀 ~ WebhookController ~ deleteWebHook ~ id:", id)
       
        const response = await this.serviceWebHook.deleteWebHook(id);
        return response;
    }
}
