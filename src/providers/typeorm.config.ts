import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Pago } from 'src/entity/Pago';
import { PagoPasarela } from 'src/entity/PagoPasarela';
import { Servicio } from 'src/entity/Servicio';
import { User } from 'src/entity/User';

export async function getTypeOrmConfigDO(localPort: number): Promise<TypeOrmModuleOptions> {
  return {
    type: 'mysql', 
    host: process.env.DO_DB_HOST, 
    port: localPort,
    username: process.env.DO_DB_USERNAME,
    password: process.env.DO_DB_PASSWORD,
    database: process.env.DO_DB,
    entities: [User, PagoPasarela, Pago, PagoPasarela, Servicio], 
    synchronize: false, 
    logging: true,
    autoLoadEntities: true,
    extra: {
      connectionLimit: 20,       // Número máximo de conexiones simultáneas
      queueLimit: 0,              // Sin límite para la cola de solicitudes
      waitForConnections: true,   // Esperar conexiones disponibles
  },
  };

}

export async function getTypeOrmConfigAWS(localPort: number): Promise<TypeOrmModuleOptions> {
  return {
    name: 'AWS',
    type: 'mysql', 
    host: process.env.AWS_DB_HOST, 
    port: localPort,
    username: process.env.AWS_DB_USERNAME,
    password: process.env.AWS_DB_PASSWORD,
    database: process.env.AWS_DB,
    entities: [User, PagoPasarela, Pago, PagoPasarela, Servicio], 
    synchronize: false, 
    retryAttempts: 5,
    connectTimeout: 30000,
    logging: true,
  };
}
