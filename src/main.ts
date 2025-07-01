import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Auto-generated API docs')
    .setVersion('1.0')
    .addBearerAuth() // if using JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); 

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
