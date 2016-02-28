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
        graphiql: true
      }
    },

    initialize(cb) {
      const graphqlUrl = sails.config[this.configKey].url;

      sails.on('hook:orm:loaded', () => {
        if (Object.keys(sails.models).length < 1) {
          return cb();
        }

        GQL.loadFromORM(new WaterlineTranslator(sails.models));
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
