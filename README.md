## Show Open Food Trucks
Command line program that prints out an alphabetically ordered list of all food trucks (default is 10 at a time) that are open at that moment.


## Installation
- Requires [Node.js LTS](https://nodejs.org/en/download/) installed
  - Minumum required version: v10.3.0. Latest LTS version recommended
  - Latest LTS ships with npm ^v6.0.0
- Unpack source code and navigate to root directory (default: show-open-food-trucks)
  - `npm i` to install dependencies
  - `npm run build` to build 


## Usage
`show-open-food-trucks -h` to see script usage
```
Usage: show-open-food-trucks [options]
Shows open food trucks right now in alphabetical order.
Will be prompted to show more results if there are more than specified limit (default: 10)

Options:
  -V, --version        output the version number
  -l, --limit [limit]  [limit] number of results per page (default: 10)
  -h, --help           output usage information
```
`show-open-food-trucks` lists first 10 open food trucks and askes for user input for next 10. Answer Y/N to continue or to terminate
