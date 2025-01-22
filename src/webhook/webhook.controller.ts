import { Controller, Get, Post, Req } from '@nestjs/common';
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
    }
}
