const GraphQLHTTP = require('express-graphql');
const GraysQL = require('graysql');
const ORMLoader = require('graysql-orm-loader');
const WaterlineTranslator = require('graysql-orm-loader-waterline');


const GQL = new GraysQL();
GQL.use(ORMLoader);


module.exports = sails => {

  const graphqlRoutes = {};

  return {

    defaults: {
      __configKey__: {
        url: '/graphql',
        graphiql: true,
        ignored: []
      }
    },

    initialize(cb) {
      console.log(this.configKey);
      const graphqlUrl = sails.config[this.configKey].url;
      const ignoredModels = sails.config[this.configKey].ignored.map(model => model.toLowerCase());

      sails.on('hook:orm:loaded', () => {
        if (Object.keys(sails.models).length < 1) {
          return cb();
        }

        const models = Object.keys(sails.models).reduce((models, key) => {
          if (ignoredModels.indexOf(key) < 0) {
            models[key] = sails.models[key];
          }
          return models;
        }, {});
        GQL.loadFromORM(new WaterlineTranslator(models));
        const Schema = GQL.generateSchema();

        graphqlRoutes[graphqlUrl] = GraphQLHTTP({
          schema: Schema,
          pretty: true,
          graphiql: sails.config[this.configKey].graphiql
        });

        return cb();
      });
    },

    routes: {
      after: graphqlRoutes
    }

  };

};
