import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './application/app.module';
import { join } from 'path';
// import * as handlebars from 'handlebars';

//
const staticPath = join(__dirname, '../public');
const viewsPath = join(__dirname, '../views');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  // app.useStaticAssets('public');
  // app.setBaseViewsDir('views');

  app.useStaticAssets(staticPath);
  app.setBaseViewsDir(viewsPath);

  app.setViewEngine('hbs');

  await app.listen(3000);

}
bootstrap();
