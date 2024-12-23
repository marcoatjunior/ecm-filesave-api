import { Module } from '@nestjs/common';
import { BatchController } from './controllers';

@Module({
  controllers: [BatchController],
})
export class BatchModule {}
