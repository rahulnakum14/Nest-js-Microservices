## Nest Js clean Architecture With Rest API
```
nestjs-clean-architecture/
├── src/
│   ├── application/
│   │   ├── services/
│   │   │   ├── user.service.ts
│   │   ├── use-cases/
│   │       ├── create-user.use-case.ts
│   │       ├── get-user.use-case.ts
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── user.entity.ts
│   │   ├── repositories/
│   │       ├── user.repository.ts
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── user.schema.ts
│   │   │   ├── user.repository.impl.ts
│   │   ├── controllers/
│   │       ├── user.controller.ts
│   │   ├── config/
│   │       ├── app.module.ts
│   │       ├── database.module.ts
│   ├── shared/
│       ├── dto/
│       │   ├── create-user.dto.ts
│       ├── interfaces/
│           ├── user.interface.ts
├── test/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
```
## Nest Js Clean Architecture With Graphql
- [Nest Js With Graphql](./nest_graphql/)
```
src/
|-- application/
|   |-- dto/
|   |   |-- create-user.dto.ts
|   |   |-- update-user.dto.ts
|   |-- exceptions/
|   |   |-- user-not-found.exception.ts
|   |-- interfaces/
|       |-- user-repository.interface.ts
|   |-- use-cases/
|       |-- create-user.usecase.ts
|       |-- get-user.usecase.ts
|       |-- update-user.usecase.ts
|       |-- delete-user.usecase.ts
|
|-- domain/
|   |-- entities/
|       |-- user.entity.ts
|
|-- infrastructure/
|   |-- config/
|   |   |-- config.module.ts
|   |   |-- config.service.ts
|   |-- database/
|   |   |-- database.module.ts
|   |   |-- database.providers.ts
|   |-- logger/
|   |   |-- logger.module.ts
|   |   |-- logger.service.ts
|   |-- repositories/
|       |-- user.repository.ts
|
|-- presentation/
|   |-- controllers/
|       |-- user.controller.ts
|   |-- filters/
|       |-- http-exception.filter.ts
|   |-- interceptors/
|       |-- logging.interceptor.ts
|   |-- graphql/
|       |-- schema.graphql
|   |-- presenters/
|       |-- user.presenter.ts
|
|-- app.module.ts
|-- main.ts
```
