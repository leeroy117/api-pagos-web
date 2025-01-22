
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Customer, IChargeRequestBank, IPagoPasarelaInfoAlumno } from '../interfaces/pagoPasarela';
import { Type } from 'class-transformer';
import { InfoAlumnoDto } from './InfoAlumnoDto';

export class RegistrarFullPagoBankDto implements IChargeRequestBank {
   
   @IsNotEmpty()
   amount: number;

   @IsNotEmpty()
   description: string;

   @IsNotEmpty()
   customer: Customer;

   @IsNotEmpty()
   @IsIn(['bank_account'])
   method: string;

   @IsNotEmpty()
   @IsString()
   order_id: string;

   @ValidateNested()
   @Type(() => InfoAlumnoDto)
   info_alumno: InfoAlumnoDto;

}