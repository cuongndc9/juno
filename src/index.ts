import { createLogger, transports, format } from 'winston';
import { flatten } from 'lodash';

type Level = 'error' | 'warn' | 'info';
type DefaultMeta = {
  layer?: string;
  component?: string;
  fileName?: string;
};
type Options = {
  environment?: string;
};

const globalOptions: Options = {
  environment: 'development',
};

const getLogger = (level: Level = 'info', defaultMeta?: DefaultMeta) => {
  const { Console } = transports;
  const {
    combine, timestamp, json, splat, errors,
  } = format;
  const logger = createLogger({
    level,
    format: combine(
      errors({ stack: true }),
      splat(),
      timestamp(),
      json(),
    ),
    defaultMeta,
    transports: [
      new Console(),
    ],
  });
  return logger;
};

const formatRest = (environment = 'development') => (...rest: any[]) => {
  const flattenRest = flatten(rest);
  flattenRest.forEach((element, index) => {
    if (element instanceof Error) {
      flattenRest.splice(index, 1);
      flattenRest.push(`${element.name}: ${element.message}`);
      if (environment === 'development') {
        flattenRest.push(element.stack);
      }
    }
  });
  return flattenRest;
};

/**
 * Create a logger instance with 3 levels: error, warn and info.
 *
 * @param {object} defaultMeta Metadata can be the current path, component, group, service, layer, etc.
 */
const logger = (defaultMeta?: DefaultMeta) => ({
    error(...rest: any[]) {
      getLogger('error', defaultMeta).error(formatRest(globalOptions.environment)(rest));
    },
    warn(...rest: any[]) {
      getLogger('warn', defaultMeta).warn(formatRest(globalOptions.environment)(rest));
    },
    info(...rest: any[]) {
      getLogger('info', defaultMeta).info(formatRest(globalOptions.environment)(rest));
    },
  });

export { logger, globalOptions };
