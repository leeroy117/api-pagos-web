import { Test, TestingModule } from '@nestjs/testing';
import { PagosPasarelaService } from './pagos-pasarela.service';

describe('PagosPasarelaService', () => {
  let service: PagosPasarelaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagosPasarelaService],
    }).compile();

    service = module.get<PagosPasarelaService>(PagosPasarelaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
