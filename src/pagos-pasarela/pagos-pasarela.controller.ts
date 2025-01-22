import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { PagosPasarelaService } from './pagos-pasarela.service';
import { PagoPasarela } from 'src/entity/PagoPasarela';
import { RegistrarFullPagoCardDto } from './dto/RegistrarFullPagoCardDto';
import { RegistrarFullPagoCashDto } from './dto/RegistrarFullPagoCashDto';
import { RegistrarFullPagoBankDto } from './dto/RegistrarFullPagoBankDto';

@Controller('pagos-pasarela')
export class PagosPasarelaController {
    constructor(private readonly pagosPasarelaService: PagosPasarelaService) {}

    @Get()
    getHello(): Promise<PagoPasarela[]> {
        return this.pagosPasarelaService.findAll();
    }

    @Post('card')
    async registrarPagoCard(@Body() createPagoPasarelaCardDto: RegistrarFullPagoCardDto) {
        console.log("🚀 ~ PagosPasarelaController ~ registrarPagoCard ~ createPagoPasarelaCardDto:", createPagoPasarelaCardDto)
        const response = await this.pagosPasarelaService.registrarPagoCard(createPagoPasarelaCardDto);
        console.log("🚀 ~ PagosPasarelaController ~ registrarPagoCard ~ response:", response);  
        return response;
    }

    @Post('cash')
    async registrarPagoCash(@Body() createPagoPasarelaCashDto: RegistrarFullPagoCashDto) {
        console.log("🚀 ~ PagosPasarelaController ~ registrarPagoCashSpei ~ createPagoPasarelaCashDto:", createPagoPasarelaCashDto)
        const response = await this.pagosPasarelaService.registrarPagoCash(createPagoPasarelaCashDto);
        console.log("🚀 ~ PagosPasarelaController ~ registrarPagoCard ~ response:", response)
        return response;
    }

    @Post('bank')
    async registrarPagoBank(@Body() createPagoPasarelaBankDto: RegistrarFullPagoBankDto) {
        console.log("🚀 ~ PagosPasarelaController ~ registrarPagoBank ~ createPagoPasarelaBankDto:", createPagoPasarelaBankDto)
        const response = await this.pagosPasarelaService.registrarPagoBank(createPagoPasarelaBankDto);
        console.log("🚀 ~ PagosPasarelaController ~ registrarPagoCard ~ response:", response)
        return response;
    }
    
}
