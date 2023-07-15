'use strict';

/**
 * tool-collection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tool-collection.tool-collection');
