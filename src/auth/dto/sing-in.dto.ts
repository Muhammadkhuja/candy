import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class SingInDto {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}