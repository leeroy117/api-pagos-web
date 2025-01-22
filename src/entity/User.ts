import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('userstypeorm')
export class User {
  @PrimaryGeneratedColumn()   // Define una columna como clave primaria autoincrementada
  id: number;

  @Column()  // Define una columna llamada "name"
  name: string;

  @Column()  // Define una columna llamada "email"
  email: string;

  @Column()  // Define una columna llamada "password"
  password: string;
}
