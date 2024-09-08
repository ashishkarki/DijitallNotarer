import { Test, TestingModule } from '@nestjs/testing';
import { NotarizationResolver } from './notarization.resolver';
import {NotarizationService} from "./notarization.service";

describe('NotarizationResolver', () => {
  let resolver: NotarizationResolver;
  let service: NotarizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotarizationResolver, {
        provide: NotarizationService,
        useValue: {
          // uploadDocument: jest.fn(() => false),
        }
      }],
    }).compile();

    resolver = module.get<NotarizationResolver>(NotarizationResolver);
    service = module.get<NotarizationService>(NotarizationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
