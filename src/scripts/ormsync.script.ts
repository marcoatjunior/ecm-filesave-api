import fs = require('fs');
import { configService } from 'src/config';

fs.writeFileSync(
  'ormconfig.ts',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
