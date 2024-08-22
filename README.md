# Word Counter Application for Userbot intervew

The project was developed using the NestJs framework, using the Singleton Design pattern.
## Setup

- Package installation: 
```console
npm install
```

- Run application
```console
npm start
```

## Usage

- To analyze a file, send a GET request to `/file-parser/parse-file?path={file-path}`.
- `{file-path}` can be a local file path or a URL.

- There are 3 files for testing:
  - Local files
    - test\localfile\test_base.txt -> Base test
    - test\localfile\test_empty_file.txt -> Testing empty file
    - test\localfile\test_repeted_word.txt -> Testing repeted words
  - Web URL
    - https://filesamples.com/samples/document/txt/sample2.txt

## Running in Docker

1. Build the Docker image:
```console
npm run docker:build
```
2. Run the Docker container:
```console
npm run docker:run
```

## Running Tests

Run unit tests:
```console
npm run test
```
### Unit Test Description
The application includes unit tests written with Jest to verify the correct functioning of the FileParserService. Below is a description of the main tests:

1. should correctly analyze a file from a URL:

    - Verifies that the analysis of a remote file (accessible via URL) is performed correctly.
    - Uses a mock of axios to simulate the download of content.
    - Checks that the analysis results are correct, similar to the test for local files.

2. should correctly analyze a local file:

    - Verifies that the analysis of a local file is performed correctly.
    - Uses mock content ('Hello World') to simulate reading a file.
    - Checks that the number of words, letters, and spaces is calculated correctly and that no words are repeated more than 10 times.

3. should handle empty content correctly:

    - Verifies that the service correctly handles the case where the file (local or remote) is empty.
    - Checks that the count of words, letters, and spaces is zero and that no words are repeated.

4. should correctly identify repeated words:
    - Verifies that the service correctly identifies words that are repeated more than 10 times.
    - Uses mock content with a word repeated 14 times and checks that the count is correct.

5. should throw an error when fetching a file from URL fails:
   - Simulates an error during the download of a file from a URL and verifies that an exception is thrown with the appropriate message.

6. should throw an error when reading a local file fails:
    - Simulates an error during the reading of a local file and verifies that an exception is thrown with the appropriate message.
