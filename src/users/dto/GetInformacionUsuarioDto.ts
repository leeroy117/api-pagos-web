
import { IsNotEmpty } from 'class-validator';

export class GetInformacionUsuarioDto {

    @IsNotEmpty()
    id_plan_estudio: string;
    
    @IsNotEmpty()
    id_moodle_alumno: string;
    
}