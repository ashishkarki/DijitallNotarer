import {Mutation, Resolver, Query} from '@nestjs/graphql';
import {NotarizationService} from "./notarization.service";

@Resolver()
export class NotarizationResolver {
    constructor(private readonly notarizationService: NotarizationService) {
    }

    // define a sayHello query to avoid any schema generation error
    @Query(() => String)
    sayHello(): string {
        return "hello, from the GraphQL Server of DijitallNotarer!!";
    }

    @Mutation(() => Boolean)
    async uploadDocument(): Promise<boolean> {
        // TODO uploaded a hardcoded doc for now
        return this.notarizationService.uploadDocument('../../data/loremIpsum.pdf')
    }
}
