import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { address } from 'ip';

async function bootstrap(): Promise<string | undefined> {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });

    const port = 3000; // 定义端口号

    await app.listen(port);

    const localhost = 'localhost'; // 本地地址

    const network = address(); // 获取当前设备的网络地址

    return `Application is running on:
    Local: http://${localhost}:${port}
    Network: http://${network}:${port}
    `;
  } catch (error) {
    console.error('Error occurred while retrieving IP address:', error);
  }
}
bootstrap().then((print) => console.log(print));
