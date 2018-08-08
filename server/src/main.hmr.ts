import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { EnvironmentConstants } from './enviroment/enviroment';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(EnvironmentConstants.ApiPort);
  // tslint:disable-next-line:no-console
  console.log(`Running on PORT ${EnvironmentConstants.ApiPort}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
