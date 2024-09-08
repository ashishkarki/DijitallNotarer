import { Test, TestingModule } from '@nestjs/testing';
import { NotarizationResolver } from './notarization.resolver';

describe('NotarizationResolver', () => {
  let resolver: NotarizationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotarizationResolver],
    }).compile();

    resolver = module.get<NotarizationResolver>(NotarizationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
