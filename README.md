# Userbot Technical Test

This is a TypeScript application that reads a text file and returns some information about the content.

## Features

- Parses the content of a file and stores it.
- Returns the list of words in the file.
- Returns the number of words in the file.
- Returns the number of spaces in the file.
- Returns the number of symbols in the file.
- Returns the list of repeated words in the file.
- Returns the number of letters in the file, with options to include spaces and symbols in the count.

## Installation

To install the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.

## Build
To build the project, run the following command:

```bash
npm run build
```

## Usage

To use the application, you can run the project from node and specify the file path to read as an argument. Here is an example:

  ```bash
  
  node dist/index.js ./demoText.txt
  node dist/index.js https://www.gutenberg.org/files/1342/1342-0.txt
  
  ```


## Testing

The project uses Jest for testing. To run the tests, use the following command:

```bash
npm run test
```

## Author

Leica Florian <florian.leica@gmail.com>

## License

This project is licensed under the ISC license.
