import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { PagoPasarela } from './PagoPasarela';

@Entity('tb_servicios') // Se indica el nombre de la tabla en la base de datos
export class Servicio {
    @PrimaryGeneratedColumn() // Define una columna como clave primaria autoincrementada
    id: number;

    @Column({ name: 'nombre', type: 'varchar', length: 100 }) // Define una columna llamada "nombre"
    nombre: string;

    @Column({ name: 'nomenclatura', type: 'char', length: 10 }) // Define una columna llamada "nomenclatura"
    nomenclatura: string;

    @Column({ name: 'id_tipo', type: 'int' }) // Define una columna llamada "id_tipo"
    idTipo: number;

    @Column({ name: 'id_plan_estudio', type: 'int' }) // Define una columna llamada "id_plan_estudio"
    idPlanEstudio: number;

    @Column({ name: 'monto', type: 'float' }) // Define una columna llamada "monto"
    monto: number;

    @Column({ name: 'apoyo', type: 'float' }) // Define una columna llamada "apoyo"
    apoyo: number;

    @Column({ name: 'estatus', type: 'tinyint' }) // Define una columna llamada "estatus"
    estatus: number;

    @Column({ name: 'fecha_registro', type: 'timestamp' }) // Define una columna llamada "fecha_registro"
    fechaRegistro: Date;

    //relationships
    @OneToMany(() => PagoPasarela, (pagoPasarela) => pagoPasarela.servicio, { lazy: true })
    pagos: Promise<PagoPasarela[]>;
}
