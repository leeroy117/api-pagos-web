import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Servicio } from 'src/entity/Servicio';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ServicioService {
    constructor(
        @InjectRepository(Servicio, 'DO') private readonly servicioRepository: Repository<Servicio>,
        @InjectDataSource('DO') private readonly dataSource: DataSource
    ) {

    }

    findAll(idPlanEstudio: number): Promise<Servicio[]> {
        return this.servicioRepository.find({
            where: {
                idPlanEstudio: idPlanEstudio
            },
        });
    }

    async findOne(id_servicio: number) {
        
        const queryRunner = this.dataSource.createQueryRunner();

        try{
          await queryRunner.connect();
  
            return queryRunner.manager.find(Servicio, {
              where: {
                  id: id_servicio
                }
            });
            // return response[0]
            
        } finally{
          await queryRunner.release()
        }

        
    }


}
