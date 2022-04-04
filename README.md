## 코드 설명

### install nestjs/cli

- `npm i -g @nestjs/cli`

### env 파일 생성

1. PORT = 3000/4000등 원하는 포트번호 적으시면 됩니다.
2. DB_URL = mongo DB 주소
3. SECRET_KEY = TOKEN KEY

### playground

- `npm run start:dev`
- playground 주소 : localhost:4000(PORT)/graphql

### table

1. user : user 관련 모듈
2. forms : form,section 관련 모듈

> - mongoose에서는 schema로 파일명을 많이 짓길래 schemas에 넣어 두었습니다.
> - schemas/User entity에 주석 달았으니 그거 먼저 보고 짜주시면 될 것 같습니다
> - nestjs/mongoose의 공식 문서 보고 따라서 코드 짰습니다! 더 좋은 방법 있으면 거기에 맞춰 바꾸신 다음 공유해 주시면 됩니다.

### 폴더별 분류

1. dto
   > - graphql의 input type,graphql type을 정의해주는 폴더입니다.
2. resolver.ts
   > - graphql의 resolver를 정의합니다.(graphql에서 사용할 함수를 정의한다고 생각하면 됩니다.)
3. service.ts
   > - graphql의 resolver에서 사용할 logic 작성해 주시면 됩니다

### DB 필드명

- 스네이크케이스에서 카멜케이스로 JS에 맞추어서 바꿨습니다.
- 섹션 타이틀(section_title)같은 경우 section.section_title 이런식으로 중복 사용될 것 같아서 title만 저장했습니다.

</pre>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

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
