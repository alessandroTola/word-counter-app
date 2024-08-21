import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class FileParserService {
  async parseFile(path: string) {
    Logger.log(`FileParserService.parseFile.begin: path=${path}`);

    const fileContent = await this.getFileContent(path);

    const wordsCount = this.wordsCount(fileContent);
    const lettersCount = this.lettersCount(fileContent);
    const spacesCount = this.spacesCount(fileContent);
    const wordsCountGreater = this.wordsCountGreater(fileContent);

    return {
      wordsCount,
      lettersCount,
      spacesCount,
      wordsCountGreater,
    };
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

    if (path.startsWith('http') || path.startsWith('https')) {
      // Fetch content from URL
      try {
        const response = await axios.get(path);
        return response.data;
      } catch (error) {
        Logger.error(`FileParserService.getFileContent.error: ${error}`);
        throw new Error('Error fetching file from URL');
      }
    } else {
      try {
        // Read content from file
        const content = await fs.promises.readFile(path, 'utf8');
        return content;
      } catch (error) {
        Logger.error(`FileParserService.getFileContent.error: ${error}`);
        throw new Error('Error reading file from local path');
      }

    }
  }

  /**
   * Function to count words into a file content
   * @param content File content
   * @returns Number of words
   */
  private wordsCount(content: string): number {
    // Implementation to count words
    Logger.log(`FileParserService.wordsCount.begin`);
    const wordsCount = content.split(/\s+/).filter(Boolean).length;
    return wordsCount;
  }

  /**
   * Function to count letters into a file content
   * @param content File content
   * @returns Number of letters
   */
  private lettersCount(content: string): number {
    // Implementation to count letters
    Logger.log(`FileParserService.lettersCount.begin`);
    const lettersCount = content.replace(/[^a-zA-Z]/g, '').length;
    return lettersCount;
  }

  /**
   * Function to count spaces into a file content
   * @param content File content
   * @returns Number of spaces
   */
  private spacesCount(content: string): number {
    // Implementation to count spaces
    Logger.log(`FileParserService.spacesCount.begin`);
    const spacesCount = content.split(/\s/g).filter(Boolean).length;
    return spacesCount;
  }


  /**
   * Method to count wards that count is greater then 10
   * @param content File content
   * @returns Object with words and count
   */
  private wordsCountGreater(content: string): { [key: string]: number } {
    Logger.log(`FileParserService.wordsCountGreater.begin`);
    // Implementation to count words
    const words = content.toLocaleLowerCase().split(/\s+/);

    // Count words
    const wordsCount = words.reduce((acc, word) => {
      acc[word] = acc[word] ? acc[word] + 1 : 1;
      return acc;
    }, {});

    // Filter words with count greater than 10
    const repeatedWords: { [key: string]: number } = {};
    for (const word in wordsCount) {
      if (wordsCount[word] > 10) {
        repeatedWords[word] = wordsCount[word];
      }
    }

    return repeatedWords;
  }
}
