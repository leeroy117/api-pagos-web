import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('tb_pagos') // Se indica el nombre de la tabla en la base de datos
export class Pago {
  @PrimaryGeneratedColumn() // Define una columna como clave primaria autoincrementada
  id: number;

  @Column({ name: 'id_alumno' }) // Define una columna llamada "id_alumno"
  idAlumno: number;

  @Column({ name: 'id_tipo' }) // Define una columna llamada "id_tipo"
  idTipo: number;

  @Column({ name: 'monto', type: 'decimal', precision: 8, scale: 2 }) // Define una columna llamada "monto"
  monto: number;

  @Column({ name: 'id_servicio' }) // Define una columna llamada "id_servicio"
  idServicio: number;

  @Column({ name: 'deuda' }) // Define una columna llamada "deuda"
  deuda: number;

  @Column({ name: 'fecha_pago', type: 'date' }) // Define una columna llamada "fecha_pago"
  fechaPago: Date;

  @Column({ name: 'fecha_periodo', type: 'date' }) // Define una columna llamada "fecha_periodo"
  fechaPeriodo: Date;

  @Column({ name: 'fecha_registro', type: 'timestamp' }) // Define una columna llamada "fecha_registro"
  fechaRegistro: Date;

  @Column({ name: 'fecha_expiracion', type: 'datetime' }) // Define una columna llamada "fecha_expiracion"
  fechaExpiracion: Date;

  @Column({ name: 'fecha_modificacion', type: 'datetime' }) // Define una columna llamada "fecha_modificacion"
  fechaModificacion: Date;

  @Column({ name: 'id_cuenta' }) // Define una columna llamada "id_cuenta"
  idCuenta: number;

  @Column({ name: 'nombre_titular_cuenta' }) // Define una columna llamada "nombre_titular_cuenta"
  nombreTitularCuenta: string;

  @Column({ name: 'clave_rastreo' }) // Define una columna llamada "clave_rastreo"
  claveRastreo: string;

  @Column({ name: 'imagen' }) // Define una columna llamada "imagen"
  imagen: string;

  @Column({ name: 'comentarios' }) // Define una columna llamada "comentarios"
  comentarios: string;

  @Column({ name: 'id_usuarios' }) // Define una columna llamada "id_usuarios"
  idUsuarios: number;

  @Column({ name: 'estatus' }) // Define una columna llamada "estatus"
  estatus: number;

  @Column({ name: 'fecha_baja', type: 'timestamp' }) // Define una columna llamada "fecha_baja"
  fechaBaja: Date;
}
