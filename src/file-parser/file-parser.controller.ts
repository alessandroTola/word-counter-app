import { Controller } from '@nestjs/common';
import { FileParserService } from './file-parser.service';

@Controller('file-parser')
export class FileParserController {
  constructor(private readonly fileParserService: FileParserService) {}
}
