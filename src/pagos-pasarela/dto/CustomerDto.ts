
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Customer } from '../interfaces/pagoPasarela';

export class CustomerDto implements Customer {

    @IsEmail()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;

}