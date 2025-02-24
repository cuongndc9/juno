Not using GitHub? Find me on [LinkedIn](https://www.linkedin.com/in/cuong9/)!
# juno

👩‍🚀 Pretty logger for Node.

## installation

```sh
yarn add juno-js
```

## usage

```typescript
import { logger, globalOptions } from 'juno-js';

globalOptions.environment = 'production'; // optional, default is development

logger.info('Hi 🧕');
logger.info('Name 👨‍💻', 'Cuong Tran');
logger.info('Age 🌳', '22', { layer: 'testing' }); // support defaultMeta (type DefaultMeta)
// type DefaultMeta = {
//   layer: string;
//   component: string;
//   fileName: string;
// };
```

## license

MIT © [Cuong Tran](https://github.com/103cuong)
