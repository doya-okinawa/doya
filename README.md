# DOYA.IO

* DOYA-OKINAWA公式サイト 兼 ドヤリングシェアサービスになる予定のもの

## Requirements

* [Nodejs](http://nodejs.org)
* [MongoDB](http://mongodb.org)

## Installation

$`git clone https://github.com/doya-okinawa/doya && cd doya`

$`npm install`

$`npm install --global gulp`

## Development

#### Starting MongoDB

$`gulp mongod`

#### Starting server with nodemon on localhost:3000

$`gulp dev`

#### Populating initial data

$`gulp db:seed`

#### Starting [BrowserSync](http://www.browsersync.io/)

$`gulp sync`
