import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApolloServer } from 'apollo-server-express';
import { AppService } from './app.service';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { AddressesModule } from './addresses/addresses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConstants } from './enviroment/enviroment';

@Module({
  imports: [
    GraphQLModule,
    AddressesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: EnvironmentConstants.SqlServer,
      port: parseInt(EnvironmentConstants.SqlPort, 10),
      username: EnvironmentConstants.SqlUsername,
      password: EnvironmentConstants.SqlPassword,
      database: EnvironmentConstants.SqlDatabase,
      entities: [`${__dirname}/**/*.entity.js`, `${__dirname}/**/*.entity.ts`],
      synchronize: EnvironmentConstants.OrmSync.toLowerCase() === 'true',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // Inject graphQLFactory as in Nestjs Docs
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configureGraphQL(app: any) {
    // Same as nestjs docs - graphql guide
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    // this changed. Apollo lib internally apply app.use(...)
    // and other middlewares to work
    // but it needs app object
    const server = new ApolloServer({ schema });
    server.applyMiddleware({ app });
  }
}
