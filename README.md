# DOYA.IO

- DOYA-OKINAWA公式サイト

## Contribution

- [GitHub Flow](http://qiita.com/tbpgr/items/4ff76ef35c4ff0ec8314)

## Requirements

- [Nodejs](http://nodejs.org)
- [MongoDB](http://mongodb.org)

## Installation

$`git clone https://github.com/doya-okinawa/doya && cd doya`

$`npm install`

$`npm install --global gulp`

$`brew update`

$`brew install mongodb`

## Development

#### Compile src/ and Run [BrowserSync](http://www.browsersync.io/)

$`gulp`

#### Starting server with nodemon on localhost:3000

$`gulp s`

#### Populating initial data

$`gulp db:reseed`

#### Debugging

$`gulp d`
