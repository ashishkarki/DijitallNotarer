import { Module } from '@nestjs/common';
import { NotarizationResolver } from './notarization.resolver';
import { NotarizationService } from './notarization.service';

@Module({
  providers: [NotarizationResolver, NotarizationService]
})
export class NotarizationModule {}
