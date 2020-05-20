<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## TODO
 * Add tests
 * Sanitize inputs
 * Use prepared statements for sql
 * Make datatypes for request and responses to elimate all uses of brackets on objects
 * Comment more code
 * How to pass auth token from Auth to handler; maybe by manipulating the req body
 * Clean up

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Running api with docker
 * Download docker [Docker Toolbox for Mac or Windows](https://docs.docker.com/toolbox/overview/)
 * If you're on linux you can download Docker through your distro's package maanger. For Ubuntu it would be `sudo apt-get install docker-ce docker-ce-cli containerd.io`, and make sure you start the docker daemon.
 * Verify that docker is installed by running the following command `sudo docker run hello-world`
 * Finally, build the docker image using `docker-compose build`, and then run the image using `docker-compose up`. To stop docker just Control+C. If you make changes to api and need to retry docker make sure you rebuild the image.

## Running the api
This relys on you having installed [Httpie](https://httpie.org/)
For the following examples anything `<something>` is user input
```bash
# Get all users -> Array of user objects
$ http :3000/api/user

# Login -> token to use for any subsequent calls
$ http :3000/api/login username=<username> password=<password>

# Create user while unauthorized -> No content on success
$ http :3000/api/user test:"true" username=<username> password=<password> accessLevel=<Regular|Admin>

# Create user while authorized -> No content on success
$ http :3000/api/user authorization:"<token>" username=<username> password=<password> accessLevel=<Regular|Admin>
```

## Installation
Install Redis for your system. If you're on mac use 
`brew install redis`
if you're on ubuntu
`sudo apt-get install redis`
if you're on windows [Redis for windows](https://github.com/MicrosoftArchive/redis/releases)

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
=======
# seniorProj-api

csc 190/191
Senior project api

linked with front end: https://gitlab.com/leathy/190project.git
---
