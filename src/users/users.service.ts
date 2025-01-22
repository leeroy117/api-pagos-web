import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Servicio } from 'src/entity/Servicio';
import { EntityManager, DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectDataSource('DO') private readonly dataSource: DataSource,
       @InjectRepository(Servicio, 'DO') private readonly servicioRepository: Repository<Servicio>,
    ) {}

    async findById(idPlanEstudio: number, id: number){

        const queryRunner = this.dataSource.createQueryRunner();

        try{
          await queryRunner.connect();
  
          return  queryRunner.manager.query('CALL escolar.sp_pasarela_get_informacion_usuario(?, ?)', [
            idPlanEstudio,
            id
          ]);

          // return response[0][0];
          
        } finally{
          await queryRunner.release()
        }
        
    }
}
