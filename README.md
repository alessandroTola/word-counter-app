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

## Running in Docker

1. Build the Docker image:
```console
docker build -t word-counter-app .
```
2. Run the Docker container:
```console
docker run -p 3000:3000 word-counter-app
```

## Running Tests

Run unit tests:
```console
npm run test
```