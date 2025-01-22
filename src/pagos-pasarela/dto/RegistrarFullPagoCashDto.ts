
import { IsIn, IsNotEmpty, ValidateNested } from 'class-validator';
import { IChargeRequestCash, Customer } from '../interfaces/pagoPasarela';
import { Type } from 'class-transformer';
import { InfoAlumnoDto } from './InfoAlumnoDto';

export class RegistrarFullPagoCashDto implements IChargeRequestCash {
   
   @IsNotEmpty()
   amount: number;

   @IsNotEmpty()
   description: string;

   @IsNotEmpty()
   customer: Customer;

   @IsNotEmpty()
   @IsIn(['store'])
   method: string;

   @IsNotEmpty()
   order_id?: string;

   @ValidateNested()
   @Type(() => InfoAlumnoDto)
   info_alumno: InfoAlumnoDto;

   @IsNotEmpty()
   due_date: Date;

}