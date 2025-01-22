import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoPasarela } from 'src/entity/PagoPasarela';
import { Servicio } from 'src/entity/Servicio';
import { getTypeOrmConfigAWS, getTypeOrmConfigDO } from 'src/providers/typeorm.config';
import { SshModule } from 'src/ssh/ssh.module';
import { SSHService } from 'src/ssh/ssh.service';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        // DO Connection
        TypeOrmModule.forRootAsync({
            imports:[SshModule],
            inject: [SSHService],
            name: 'DO',
            useFactory: async (sshService: SSHService) => {
              const sshConfig = {
                username: process.env.DO_SSH_USERNAME,
                password: process.env.DO_SSH_PASSWORD,
                host: process.env.DO_SSH_HOST,
                port: process.env.DO_SSH_PORT,
                // privateKey: require('fs').readFileSync('./ag_academia_global.pem'), // O usa 'password' si no tienes clave privada
              };
              
              const localPort = await sshService.createTunnel(
                sshConfig, 
                process.env.DO_DB_HOST, 
                parseInt(process.env.DO_DB_PORT),
                parseInt(process.env.DO_SSH_SRC_PORT)
              );
                console.log("🚀 ~ useFactory: ~ localPort:", localPort)
              return getTypeOrmConfigDO(localPort);
            },
            dataSourceFactory: async (options) => {
              console.log("🚀 ~ dataSourceFactory: ~ options:", options)
              const dataSource = await new DataSource(options).initialize();
              return dataSource;
            },
        }),
        TypeOrmModule.forFeature([PagoPasarela, PagoPasarela, Servicio ], 'DO'),
        //AWS connection
        // TypeOrmModule.forRootAsync({
        //     imports:[SshModule],
        //     useFactory: async (sshService: SSHService) => {
        //     const sshConfig = {
        //         username: process.env.AWS_SSH_USERNAME,
        //         host: process.env.AWS_SSH_HOST,
        //         port: process.env.AWS_SSH_PORT,
        //         privateKey: require('fs').readFileSync('./ag_academia_global (1).pem'), // O usa 'password' si no tienes clave privada
        //         // passphrase: 'aIVaJjeDgYe1Hu3fxRfsv6#tF5E4MzNVLigQtfk/vOfOrRJ9gFnLhGdJ4OnH'
        //     };
            
        //     const localPort = await sshService.createTunnel(sshConfig, 
        //         process.env.AWS_DB_HOST, 
        //         parseInt(process.env.AWS_DB_PORT), 
        //         parseInt(process.env.AWS_SSH_SRC_PORT)
        //     );
        //     console.log("🚀 ~ useFactory: ~ localPort: aws", localPort)
        //     const typeRe = await getTypeOrmConfigAWS(localPort);
        //     return typeRe;
        //     },
        //     inject: [SSHService],
        // }),
    ],
    providers: [SSHService],
    exports: [TypeOrmModule]
})
export class DatabaseModule {}
