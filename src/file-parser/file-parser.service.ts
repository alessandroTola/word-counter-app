import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FileParserService {
  async parseFile(path: string) {
    Logger.log(`FileParserService.parseFile.begin: path=${path}`);

  }

  /**
   * Function to get file content based on file path,
   * if file path contains 'http' or 'https' then it will fetch content from URL
   * otherwise it will read content from file
   * @param path 
   * @returns 
   */
  private async getFileContent(path: string): Promise<string> {
    // Implementation to read file content
    Logger.log(`FileParserService.getFileContent.begin`);
    return 'file-content';
  }

  /**
   * Function to count words into a file content
   * @param content 
   * @returns 
   */
  private wordsCount(content: string): number {
    // Implementation to count words
    Logger.log(`FileParserService.wordsCount.begin`);
    return 0;
  }

  /**
   * Function to count letters into a file content
   * @param content 
   * @returns 
   */
  private lettersCount(content: string): number {
    // Implementation to count letters
    Logger.log(`FileParserService.lettersCount.begin`);
    return 0;
  }

  /**
   * Function to count spaces into a file content
   * @param content 
   * @returns 
   */
  private spacesCount(content: string): number {
    // Implementation to count spaces
    Logger.log(`FileParserService.spacesCount.begin`);
    return 0;
  }


  /**
   * Method to count wards that count is greater then 10
   */
  private wordsCountGreater(content: string): { [key: string]: number } {
    // Implementation to count words
    return {};
  }
}
