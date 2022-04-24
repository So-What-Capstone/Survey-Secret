## 코드 설명

### install nestjs/cli

- `npm i -g @nestjs/cli`

### env 파일 생성

1. PORT = 3000/4000등 원하는 포트번호 적으시면 됩니다.
2. DB_URL = mongo DB 주소
3. SECRET_KEY = TOKEN KEY
4. MAIL_API_KEY
5. MAIL_DOMAIN
6. MAIL_FROM_EMAIL : MAILGUN API 관련 키들 입니다.

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

### AuthGuard 사용법

- Resolver 위에 @Type(["Type"]) 쓰시면 사용 가능합니다.
- Type의 종류로는 Any, Free, Premium, Admin 등이 있습니다.
- @Type을 생략하면 비로그인 회원도 사용할 수 있습니다.
- Any인 경우, 로그인 한 회원 누구나 사용 가능한 resolver
- NotLoggedIn인 경우, 로그인 안 할수도 할 수도 있음(createSubmission 같은 경우)
- ["Free","Premium"]인 경우, Admin을 제외한 회원 사용 가능 resolver
- 예시 -> forms.resolver.ts 의 createForm()

### AuthUser 사용법

- Resolver의 input에 @AuthUser() user:User 을 선언하시면 현재 로그인한 user를 얻을 수 있습니다
- request header에 토큰 키는 "x-jwt" 입니다.
- graphql context에서 "user"로 저장되어 있는 user를 불러오는 역할을 합니다.

### Transaction 들어간 연산

- 로컬 환경에서 테스팅하려면 별도로 replica set config가 필요합니다.
- https://www.npmjs.com/package/run-rs -> config 하는 법
- 귀찮으면 제가 mongo atlas URL만든 거 있는데 그거 카톡으로 요청하시면 됩니다

### editForm

- form의 요소중 title, description, sections중 보낼 것만 보내면 됩니다.
- 예를 들어서 title은 바꾸고 description, sections는 유지하고 싶으면 title만 보내면 됩니다.
- sections을 보내고 싶으면 sections을 보내면 되는데, 주의할 점은 sections 전체 내용을 보내셔야 합니다.
- sections의 question의 일부분만 바꾸고 싶어도 전체를 보내주셔야 합니다.
- 성능이 안나온다면 추후에 questionId를 전달해서 question만 바꾸는 API도 제작하겠습니다.

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
