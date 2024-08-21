import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileParserModule } from './file-parser/file-parser.module';

@Module({
  imports: [FileParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
