import { Test, TestingModule } from '@nestjs/testing';
import { FileParserController } from './file-parser.controller';
import { FileParserService } from './file-parser.service';

describe('FileParserController', () => {
  let controller: FileParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileParserController],
      providers: [FileParserService],
    }).compile();

    controller = module.get<FileParserController>(FileParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
