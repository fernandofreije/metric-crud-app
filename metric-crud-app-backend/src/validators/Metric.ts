import { type AllowedSchema } from 'express-json-validator-middleware';

export const metricSchema: AllowedSchema = {
  type: 'object',
  required: ['name', 'value'],
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string',
      minLength: 1
    },
    value: {
      type: 'number'
    },
    createdAt: {
      type: 'string'
    }
  }
};
