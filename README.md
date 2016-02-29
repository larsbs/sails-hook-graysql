# sails-hook-graysql

[Sails.js](https://sailsjs.org) hook to integrate [sails models](http://sailsjs.org/documentation/concepts/models-and-orm/models) with [GraysQL](https://github.com/larsbs/graysql). This hooks allows us to create a GraphQL schema using GraysQL from the models of our application.


## Installation

Install from NPM.

```bash
$ npm install --save sails-hook-graysql
```

## Usage

That's it. When you install this hook, it will scan all your models and provide a GraphQL schema from them. You can access the generated GraphQL schema in `/graphql` or in the URL that you configure.


## Configuration

By default, configuration lives in `sails.config.graysql`. The configuration key `graysql` can be changed by setting `sails.config.hooks['sails-hooks-graysql'].configKey`.

| Parameter | Type        | Details
|-----------|-------------| -------
| url       | ((string))  | The url in which sails will server the GraphQL schema. Defaults to `/graphql`.
| graphiql  | ((boolean)) | Whether or not sails should use graphiql.
| ignored   | ((list))    | A list of names of models to ignore.
