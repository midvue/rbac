import { MidwayConfig } from '@midwayjs/core';

export default {
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '159.75.181.188',
        port: 3306,
        username: 'psite',
        password: '524hk4KSBA5WzCGj',
        database: 'psite',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: ['warn', 'error'],
        // dateStrings: true,
        timezone: '+08:00',
        entities: ['**/entity/*'],
      },
    },
  },
} as MidwayConfig;
