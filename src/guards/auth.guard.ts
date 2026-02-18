import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface GraphQLContext {
  req?: Request;
  connectionParams?: Record<string, any>;
}

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext<GraphQLContext>().req;
  }
}
