import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
// import { Transport } from '@nestjs/microservices';
import { ApplicationModule } from './application/app.module';
import { join } from 'path';

//
const staticPath = join(__dirname, '..', 'public');
const viewsPath = join(__dirname, '..', 'views');

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter(),
  );

  app.useStaticAssets({
    root: staticPath,
    prefix: '/static/',
  });

  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: viewsPath,
  });

  await app.listen(3001);

  // const app = await NestFactory.createMicroservice(ApplicationModule, {
  //   transport: Transport.TCP,
  // });
  // app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
