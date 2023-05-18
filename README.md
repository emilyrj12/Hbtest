# Portal Test

This is a command-line interface (CLI) tool to sort a CSV file containing product data by pick_location.

## Prerequisites

- Node.js v18.16.0 or later
- NPM

## Installation

- Run `npm install` to install the project's dependencies.

## Usage
To use the Sort Products CLI, run the following command:
```bash
npm run pick <input-file-path> [output-file-path]
```

The `input-file-path` argument is mandatory and should be the path to the CSV file that contains the data. The `output-file-path` argument is optional and should be the path to the CSV file where the optimised output will be written. If the `output-file-path` argument is not provided, the output file will be named `input-file` and will be created in the `out/` directory.

If the input file or output directory does not exist, the application will display an error message and exit.

## Testing
To run the project's test suite, run the following command:

```bash
npm test
```

The test suite uses Jest to run unit tests on the project's functions. The test files are located in the `__tests__` directory.

### Example Input File 

The testing data, including the example input, is stored in the `__tests__\data` directory

```csv
product_code,quantity,pick_location
15248,10,AB 10
25636,1,C 8
26982,1,AF 7
36389,4,AC 5
25214,10,A 1
15248,5,AB 10
23689,10,X 10
11224,8,AZ 4,
15178,9,D 4
30124,5,A 1
88958,4,AZ 10
14789,3,AM 9
33331,6,AC 4
52568,7,AB 10
23568,8,AH 8
26897,9,AL 2
12456,10,AB 9
12345,15,L 3
12879,12,AL 7
```
