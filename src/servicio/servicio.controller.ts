import { Controller, Get, Param } from '@nestjs/common';
import { ServicioService } from './servicio.service';

@Controller('servicios')
export class ServicioController {

    constructor (private readonly servicioService: ServicioService) {

    }
    @Get('por-plan/:id_plan_estudio')
    getHello(@Param('id_plan_estudio') idPlanEstudioReq: string) {
        const idPlanEstudio = parseInt(idPlanEstudioReq);

        return this.servicioService.findAll(idPlanEstudio);
    }
    
    @Get(':id_servicio')
    async getServicio(@Param('id_servicio') id_servicio: string) {
        const idServicio = parseInt(id_servicio);

        const response  = await this.servicioService.findOne(idServicio);
        return response[0];
        // return this.servicioService.findOne(idServicio);
    }
}
