import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PagoPasarela } from 'src/entity/PagoPasarela';
import { DataSource, Repository } from 'typeorm';
import { Servicio } from 'src/entity/Servicio';
import { RegistrarFullPagoCardDto } from './dto/RegistrarFullPagoCardDto';
import { OpenpayService } from 'src/openpay/openpay.service';
import { RegistrarFullPagoCashDto } from './dto/RegistrarFullPagoCashDto';
import { RegistrarFullPagoBankDto } from './dto/RegistrarFullPagoBankDto';
import { ITransactionOpenPayBank } from './interfaces/responsePagoOpenPayBank';
import { Pago } from 'src/entity/Pago';
import { ITransactionOpenPayCard } from './interfaces/responsePagoOpenPayCard';

@Injectable()
export class PagosPasarelaService {

    constructor(
            @InjectRepository(PagoPasarela, 'DO') private readonly pagosPasarelaRepository: Repository<PagoPasarela>,
            @InjectRepository(Servicio, 'DO') private readonly servicioRepository: Repository<Servicio>,
            @InjectDataSource('DO') private readonly dataSource: DataSource,
            private readonly openPayService: OpenpayService,
        ) {

    }

    findAll() {
        return this.pagosPasarelaRepository.find({
            relations: ['servicio'],
        });
    }

    async registrarPagoCard(pago: RegistrarFullPagoCardDto) {

        pago.description = pago.info_alumno.servicio.nombre;
        
        const createPago = {...pago };

        // Se eliminan las propiedades del objeto, El request de OpenPay 
        // solo permite peticiones con los objetos necesarios
        delete createPago.info_alumno;
        // hacer cargo en open pay
        const transactionResponse: ITransactionOpenPayCard = await this.openPayService.createCharge(createPago);
        console.log("🚀 ~ PagosPasarelaService ~ registrarPagoCard ~ transactionResponse:", transactionResponse);

        const queryRunner = this.dataSource.createQueryRunner();

            try {
                await queryRunner.connect();
                await queryRunner.startTransaction();

                const newTransaction = queryRunner.manager.create(PagoPasarela, {
                    idAlumno: pago.info_alumno.id_alumno,
                    idMoodleAlumno: pago.info_alumno.idmoodle_alumno,
                    idPlanEstudio: pago.info_alumno.id_plan_estudio,
                    idMoodleMateria: pago.info_alumno.id_moodle_materia || null,
                    idServicio: pago.info_alumno.servicio.id,
                    authorization: transactionResponse.authorization,
                    typePayment: transactionResponse.method,
                    monto: transactionResponse.amount,
                    orderId: transactionResponse.order_id,
                    token: transactionResponse.id, // Token de la tarjeta
                    fechaRegistro: transactionResponse.operation_date,
                    status: transactionResponse.status,
                    idTransaction: transactionResponse.id,
                });
                const saveTransactionResponse = await queryRunner.manager.save(PagoPasarela, newTransaction);
                
                const newPaymentAG = queryRunner.manager.create(Pago, {
                    idAlumno: pago.info_alumno.id_alumno,
                    monto: pago.amount,
                    fechaRegistro: transactionResponse.operation_date,
                    idServicio: pago.info_alumno.servicio.id,
                    estatus: 1,
                    deuda: 0,
                    // Pago por plataforma es 5
                    idTipo: 5,
                });
                const newPaymentAGResponse = await queryRunner.manager.save(Pago, newPaymentAG);

                console.log("🚀 ~ PagosPasarelaService ~ registrarPagoCard ~ newPaymentAGResponse:", newPaymentAGResponse)
                
                await queryRunner.commitTransaction();

                return saveTransactionResponse;

            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw error;

            } finally {
                await queryRunner.release();
            }

    }

    async registrarPagoCash(pago: RegistrarFullPagoCashDto){

        const createPago = {...pago };

        delete createPago.info_alumno;
        // this.openPayService.charges.create(chargeRequest, callback);
        const transactionResponse = await this.openPayService.createCharge(createPago);
        console.log("🚀 ~ PagosPasarelaService ~ registrarPagoCash ~ transactionResponse:", transactionResponse);

        // Guardamos la transaccion en la db de escoalar
        const queryRunner = this.dataSource.createQueryRunner();

            try {
                await queryRunner.connect();
                await queryRunner.startTransaction();

                const newTransaction = queryRunner.manager.create(PagoPasarela, {
                    idAlumno: pago.info_alumno.id_alumno,
                    idMoodleAlumno: pago.info_alumno.idmoodle_alumno,
                    idPlanEstudio: pago.info_alumno.id_plan_estudio,
                    idMoodleMateria: pago.info_alumno.id_moodle_materia || null,
                    idServicio: pago.info_alumno.servicio.id,
                    authorization: transactionResponse.authorization,
                    typePayment: transactionResponse.method,
                    monto: transactionResponse.amount,
                    orderId: transactionResponse.order_id,
                    token: null, // token sera null en cash y bank
                    fechaRegistro: transactionResponse.operation_date,
                    status: transactionResponse.status,
                    idTransaction: transactionResponse.id,
                });
                const saveTransactionResponse = await queryRunner.manager.save(PagoPasarela, newTransaction);
                
                await queryRunner.commitTransaction();
                /**
                 * Se retorna la respuesta de open pay por que contiene el Link que tiene los datos para hacer 
                 * la transaccion
                 */
                return transactionResponse;
            }catch(error) {
                await queryRunner.rollbackTransaction();
                throw error;
            } finally {
                await queryRunner.release();
            }
    }

    async registrarPagoBank(pago: RegistrarFullPagoBankDto){

        const createPago = {...pago };

        delete createPago.info_alumno;
        // this.openPayService.charges.create(chargeRequest, callback);
        const transactionResponse: ITransactionOpenPayBank = await this.openPayService.createCharge(createPago);
        console.log("🚀 ~ PagosPasarelaService ~ registrarPagoCash ~ transactionResponse:", transactionResponse);

        // Guardamos la transaccion en la db de escoalar
        const queryRunner = this.dataSource.createQueryRunner();

            try {
                await queryRunner.connect();
                await queryRunner.startTransaction();

                const newTransaction = queryRunner.manager.create(PagoPasarela, {
                    idAlumno: pago.info_alumno.id_alumno,
                    idMoodleAlumno: pago.info_alumno.idmoodle_alumno,
                    idPlanEstudio: pago.info_alumno.id_plan_estudio,
                    idMoodleMateria: pago.info_alumno.id_moodle_materia || null,
                    idServicio: pago.info_alumno.servicio.id,
                    authorization: transactionResponse.authorization,
                    typePayment: transactionResponse.method,
                    monto: transactionResponse.amount,
                    orderId: transactionResponse.order_id,
                    token: null, // token sera null en cash y bank
                    fechaRegistro: transactionResponse.operation_date,
                    status: transactionResponse.status,
                    idTransaction: transactionResponse.id,
                });
                const saveTransactionResponse = await queryRunner.manager.save(PagoPasarela, newTransaction);
                
                await queryRunner.commitTransaction();
                /**
                 * Se retorna la respuesta de open pay por que contiene el Link que tiene los datos para hacer 
                 * la transaccion
                 */
                return transactionResponse;
            }catch(error) {
                await queryRunner.rollbackTransaction();
                throw error;
            } finally {
                await queryRunner.release();
            }

        // return transactionResponse;
    }

    
}
