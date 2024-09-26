import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()  // This class will be an ObjectType in the GraphQL schema
export class OperationResult {
  @Field()  // Exposes 'status' as a Boolean field in the GraphQL API
  status: boolean;

  @Field()  // Exposes 'message' as a String field in the GraphQL API
  message: string;

  // Constructor to initialize the fields
  constructor(status: boolean, message: string) {
    this.status = status;
    this.message = message;
  }
}
