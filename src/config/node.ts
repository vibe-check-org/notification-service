import { RESOURCES_DIR, config } from './notification.js';
import { env } from './env.js';
import { hostname } from 'node:os';
import { httpsOptions } from './https.js';


const { NODE_ENV } = env;


const computername = hostname();
const port = (config.node?.port as number | undefined) ?? 3000;

export const nodeConfig = {
  host: computername,
  port,
  resourcesDir: RESOURCES_DIR,
  httpsOptions,
  database: 'notification',
  nodeEnv: NODE_ENV as
    | 'development'
    | 'PRODUCTION'
    | 'production'
    | 'test'
    | undefined,
} as const;
