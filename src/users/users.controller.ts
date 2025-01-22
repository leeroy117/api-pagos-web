import { Controller, Get, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetInformacionUsuarioDto } from './dto/GetInformacionUsuarioDto';

@Controller('usuarios')
export class UsersController {
    constructor(private readonly usersService: UsersService){

    }

    @Get()
    async findById(@Query() queryParams: GetInformacionUsuarioDto, @Req() requestParams) {
        // console.log("🚀 ~ UsersController ~ findById ~ requestParams:", requestParams)
        const {
            id_plan_estudio,
            id_moodle_alumno
        } = queryParams;
        console.log("🚀 ~ UsersController ~ findById ~ queryParams:", queryParams)

        // return queryParams
        const response = await this.usersService.findById(parseInt(id_plan_estudio), parseInt(id_moodle_alumno));
        console.log("🚀 ~ UsersController ~ findById ~ response:", response)
        return response[0][0];
        // return this.usersService.findById(parseInt(id_plan_estudio), parseInt(id_moodle_alumno));
    }
}
