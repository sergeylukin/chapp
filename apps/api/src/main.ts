/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const configureSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Justt another API')
    .setDescription('REST API for Justt project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const APP_HOST = process.env.NX_APP_HOST;

  const ENV = process.env.NODE_ENV;
  const HTTP_SCHEMA = ENV === 'production' ? 'https://' : 'http://';
  const REFERER_HOST =
    ENV === 'production'
      ? APP_HOST === 'chapp-app'
        ? 'chapp.sergeylukin.com'
        : `${APP_HOST}.onrender.com`
      : APP_HOST;
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: `${HTTP_SCHEMA}${REFERER_HOST}`,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  configureSwagger(app);
  const port = process.env.PORT || 3333;
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
