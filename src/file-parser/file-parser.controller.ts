import { Controller, Get, Logger, Query } from '@nestjs/common';
import { FileParserService } from './file-parser.service';
import { promises } from 'dns';

@Controller('file-parser')
export class FileParserController {
  constructor(private readonly fileParserService: FileParserService) { }

  /**
   * End point to parse a file
   * @param path File path
   * @returns Analysis of file content
   */
  @Get('parse-file')
  async parseFile(@Query('path') path: string): Promise<any> {
    Logger.log(`FileParserController.parseFile.begin: path=${path}`);
    return this.fileParserService.parseFile(path);
  }
}
