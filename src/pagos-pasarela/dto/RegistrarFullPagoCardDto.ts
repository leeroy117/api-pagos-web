
import { IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { IChargeRequestCard, Customer } from '../interfaces/pagoPasarela';
import { Type } from 'class-transformer';
import { InfoAlumnoDto } from './InfoAlumnoDto';
import { ServicioDto } from './ServicioDto';

export class RegistrarFullPagoCardDto implements IChargeRequestCard {

   // Token de la tarjeta con el que se puede rastrear el pago
   @IsNotEmpty()
   source_id: string;
   
   @IsNotEmpty()
   amount: number;

   @IsNotEmpty()
   currency: string;

   @IsOptional()
   @IsString()
   description?: string;

   @IsNotEmpty()
   customer: Customer;

   @IsNotEmpty()
   device_session_id: string;

   @IsNotEmpty()
   @IsIn(['card'])
   method: string;

   @IsNotEmpty()
   order_id: string;

   @ValidateNested()
   @Type(() => InfoAlumnoDto)
   info_alumno: InfoAlumnoDto;

}