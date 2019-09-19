## Show Open Food Trucks
Command line program that prints out an alphabetically ordered list of all food trucks (default is 10 at a time) that are open at that moment.

CLI is only supported in Linux and Unix-like environments (ie. Ubuntu, MacOS)

CLI makes use of [Scorata Mobile Food Schedule API](https://dev.socrata.com/foundry/data.sfgov.org/jjew-r69b)

## Installation
- Requires [Node.js LTS](https://nodejs.org/en/download/) installed
  - Minumum required version: v10.3.0. Latest LTS version recommended
  - Latest LTS ships with npm ^v6.0.0
- Unpack source code and navigate to root directory (default: show-open-food-trucks)
  1. `npm i` to install dependencies
  2. `npm run build` to build 
  3. `npm i -g` to create a script symlink


## Usage
Below usage doc requires all 3 installation steps to be completed

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

### Advanced usage
Scorata Mobile Food Schedule API is throttled if not used with an app token. Instructions to get app token [here](https://dev.socrata.com/docs/app-tokens.html) and assign token to the environment variable SOCRATA_APP_TOKEN.

`export SOCRATA_APP_TOKEN=$token`

Once assigned CLI will no longer be throttled.
