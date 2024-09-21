import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { NotarizationService } from './notarization.service';
import { BadRequestException, Logger } from '@nestjs/common';

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

  @Mutation(() => Boolean)
  async uploadDocument(@Args('filePath') filePath: string): Promise<boolean> {
    try {
      this.logger.log(`NotarizationResolver, received request to upload document at: ${filePath}`);

      const result = await this.notarizationService.uploadDocument(filePath);

      // Log the result of upload
      if (result) {
        this.logger.log(`Successfully uploaded document at: ${filePath}`);
      } else {
        this.logger.log(`Failed to upload file at: ${filePath}`);
      }

      return result;
    } catch (error: any) {
      this.logger.error(`Error during document upload: ${error.message}`, error.stack);
      throw new BadRequestException(`Failed to upload document: ${error.message}`);
    }
  }
}
