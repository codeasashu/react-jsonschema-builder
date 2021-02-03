import moox from 'moox';
import schema from './models/schema';
import utils from './utils';

export const getModel = (config = {}) => {
    if(config.lang) utils.lang = config.lang;
  
    const Model = moox({
        schema
    })

    if(config.format){
        Model.__jsonSchemaFormat = config.format
    } else {
        Model.__jsonSchemaFormat = utils.format
    }

    if(config.mock) {
        Model.__jsonSchemaMock = config.mock
    }

    return Model;
}