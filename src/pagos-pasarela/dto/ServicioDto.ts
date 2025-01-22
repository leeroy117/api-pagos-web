
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import {  IServicio } from '../interfaces/pagoPasarela';

export class ServicioDto implements IServicio {
   
   @IsNotEmpty()
   @IsInt()
   id: number;

   @IsNotEmpty()
   @IsInt()
   id_tipo: number;

   @IsNotEmpty()
   @IsString()
   nombre: string;
  
}