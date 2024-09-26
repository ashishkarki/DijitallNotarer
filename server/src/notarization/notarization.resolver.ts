import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { NotarizationService } from './notarization.service';
import { BadRequestException, Logger } from '@nestjs/common';
import { OperationResult } from '../models/operation-result.dto';

@Resolver()
export class NotarizationResolver {
  private readonly logger = new Logger(NotarizationResolver.name);

  constructor(private readonly notarizationService: NotarizationService) {
  }

  // Define a sayHello query to avoid any schema generation error
  @Query(() => String)
  sayHello(): string {
    return 'Hello, from the GraphQL Server of DijitallNotarer!!';
  }

  @Mutation(() => OperationResult)
  async uploadDocument(@Args('filePath') filePath: string): Promise<OperationResult> {
    this.logger.log(`NotarizationResolver, received request to upload document at: ${filePath}`);
    return await this.notarizationService.uploadDocument(filePath);
  }
}
