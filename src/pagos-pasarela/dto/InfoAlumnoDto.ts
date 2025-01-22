
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Customer, IChargeRequestBank, IPagoPasarelaInfoAlumno } from '../interfaces/pagoPasarela';
import { IsNull } from 'typeorm';
import { Type } from 'class-transformer';
import { ServicioDto } from './ServicioDto';

export class InfoAlumnoDto implements IPagoPasarelaInfoAlumno {
   
   @IsNotEmpty()
   @IsInt()
   id_alumno: number;

   @ValidateIf((obj, value) => value !== null, {message: `info_alumno.id_moodle_materia must be an integer number or null`}) // Solo valida si el valor no es null
   @IsInt({message: "info_alumno.id_moodle_materia must be an integer number or null"})
   id_moodle_materia: number | null;

   @IsNotEmpty()
   @IsInt()
   id_plan_estudio: number;

   @IsNotEmpty()
   @IsInt()
   idmoodle_alumno: number;

   @ValidateNested()
   @Type(() => ServicioDto)
   servicio: ServicioDto;

}