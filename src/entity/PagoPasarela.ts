import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Servicio } from './Servicio';


@Entity('tb_pagos_pasarela_cash')
export class PagoPasarela  {
  @PrimaryGeneratedColumn()   // Define una columna como clave primaria autoincrementada
  id: number;

  @Column({name: 'id_alumno'})  // Define una columna llamada "idmoodleAlumno"
  idAlumno: number;

  @Column({name: 'idmoodle_alumno'})  // Define una columna llamada "idmoodleAlumno"
  idMoodleAlumno: number;

  @Column({name: 'id_plan_estudio'})  // Define una columna llamada "idPlanEstudio"
  idPlanEstudio: number;

  @Column({name: 'id_servicio'})  // Define una columna llamada "idServicio"
  idServicio: number;

  @Column({name: 'id_moodle_materia'})  // Define una columna llamada "idMoodleMateria"
  idMoodleMateria: number;

  @Column({name: 'type_payment'})  // Define una columna llamada "typePayment"
  typePayment: string;

  @Column({name: 'authorization'})  // Define una columna llamada "authorization"
  authorization: string;
  
  @Column({name: 'order_id'})  // Define una columna llamada "orderId"
  orderId: string;

  @Column({name: 'status'})  // Define una columna llamada "status"
  status: string;

  @Column({name: 'id_transaction'})  // Define una columna llamada "idTransaction"
  idTransaction: string;

  @Column({name: 'monto', type: 'decimal', precision: 10, scale: 2 })  // Define una columna llamada "monto"
  monto: number;

  @Column({name: 'type_card_info'})  // Define una columna llamada "typeCardInfo"
  typeCardInfo: string;

  // @Column({name: 'brand_card_info'})  // Define una columna llamada "brandCardInfo"
  // brandCardInfo: string;

  // @Column({name: 'address_card_info'})  // Define una columna llamada "addressCardInfo"
  // addressCardInfo: string;

  // @Column({name: 'card_number_card_info'})  // Define una columna llamada "cardNumberCardInfo"
  // cardNumberCardInfo: string;

  // @Column({name: 'holder_name_card_info'})  // Define una columna llamada "holderNameCardInfo"
  // holderNameCardInfo: string;

  // @Column({name: 'expiration_year_card_info'})  // Define una columna llamada "expirationYearCardInfo"
  // expirationYearCardInfo: string;

  // @Column({name: 'expiration_month_card_number'})  // Define una columna llamada "expirationMonthCardNumber"
  // expirationMonthCardNumber: string;

  // @Column({name: 'allows_charges_card_info'})  // Define una columna llamada "allowsChargesCardInfo"
  // allowsChargesCardInfo: string;

  // @Column({name: 'allows_payouts_card_info'})  // Define una columna llamada "allowsPayoutsCardInfo"
  // allowsPayoutsCardInfo: string;

  // @Column({name: 'bank_name_card_info'})  // Define una columna llamada "bankNameCardInfo"
  // bankNameCardInfo: string;

  @CreateDateColumn({name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })  // Define una columna llamada "bankNameCardInfo"
  fechaRegistro: Date;
  
  @UpdateDateColumn({name: 'fecha_actualizacion', type: 'timestamp', default: null })  // Define una columna llamada "bankNameCardInfo"
  fechaActualizacion: Date;

  @Column({ name: 'token', type: 'varchar'})
  token: string;

  @ManyToOne(() => Servicio, (servicio) => servicio.id, { lazy:true}) // Relación de muchos a uno
  @JoinColumn({ name: 'id_servicio' }) // Especifica la columna que se utiliza para la relación
  servicio: Promise<Servicio>;
}
