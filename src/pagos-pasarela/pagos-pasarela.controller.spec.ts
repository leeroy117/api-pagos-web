import { Test, TestingModule } from '@nestjs/testing';
import { PagosPasarelaController } from './pagos-pasarela.controller';

describe('PagosPasarelaController', () => {
  let controller: PagosPasarelaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosPasarelaController],
    }).compile();

    controller = module.get<PagosPasarelaController>(PagosPasarelaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
