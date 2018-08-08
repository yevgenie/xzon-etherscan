import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import * as express from "express";
import 'reflect-metadata';
import { EnvironmentConstants } from './enviroment/enviroment';

async function bootstrap() {
  const server: any = express();
  const app = await NestFactory.create(AppModule, server);
  
  // With Nestjs context get the app module to call our configure method
  const appModule = app.get(AppModule);
  appModule.configureGraphQL(app);
  app.useStaticAssets(join(__dirname + './../../client/build'));
  
  // await app.listen(EnvironmentConstants.ApiPort);

  if (EnvironmentConstants.CurrentEnvironment === "PROD") {
    const httpsOptions = {
        key: fs.readFileSync(EnvironmentConstants.SslKeyPath),
        cert: fs.readFileSync(EnvironmentConstants.SslCertPath),
        ca: fs.readFileSync(EnvironmentConstants.SslCertAuth)
    };
    https.createServer(httpsOptions, server).listen(EnvironmentConstants.SslPort);
    // tslint:disable-next-line:no-console
    console.log(`HTTPS Listening on port ${EnvironmentConstants.SslPort}`);
  } else {
      http.createServer(server).listen(EnvironmentConstants.ApiPort);
      // tslint:disable-next-line:no-console
      console.log(`HTTP Listening on port ${EnvironmentConstants.ApiPort}`);
  }
}
bootstrap();
