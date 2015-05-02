# DOYA.IO

- DOYA-OKINAWA公式サイトになる予定のもの

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

#### Compile src/

$`gulp`

#### Starting server with nodemon on localhost:3000

$`npm start`

#### Populating initial data

$`gulp db:reseed`

####  Stating [BrowserSync](http://www.browsersync.io/)

$`gulp bsync`

#### Debugging

$`gulp d`
