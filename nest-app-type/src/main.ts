import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ApplicationModule } from './application/app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000);
  // const app = await NestFactory.createMicroservice(ApplicationModule, {
  //   transport: Transport.TCP,
  // });
  // app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
