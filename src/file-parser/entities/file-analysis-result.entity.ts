export class FileAnalysisResult {
  constructor(
    public wordsCount: number,
    public lettersCount: number,
    public spacesCount: number,
    public wordsCountGreater: { [key: string]: number },
  ) { }
}