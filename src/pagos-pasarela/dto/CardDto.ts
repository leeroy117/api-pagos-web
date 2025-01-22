
import { IsDecimal, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ICard } from '../interfaces/card';

export class CardDto implements ICard {

    @IsNotEmpty()
    @IsString()
    holder_name: string;

    @IsNotEmpty()
    @IsString()
    card_number: string;

    @IsDecimal()
    @IsNotEmpty()
    amount: string;

    @IsNotEmpty()
    expiration_month: string;

    @IsNotEmpty()
    expiration_year: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    allows_charges: string;

    @IsNotEmpty()
    allows_payouts: string;

    @IsNotEmpty()
    bank_code: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    bank_name: string;

    @IsNotEmpty()
    brand: string;

}