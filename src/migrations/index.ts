import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251224_162920 from './20251224_162920';
import * as migration_20251224_163118 from './20251224_163118';
import * as migration_20251224_173001 from './20251224_173001';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251224_162920.up,
    down: migration_20251224_162920.down,
    name: '20251224_162920',
  },
  {
    up: migration_20251224_163118.up,
    down: migration_20251224_163118.down,
    name: '20251224_163118',
  },
  {
    up: migration_20251224_173001.up,
    down: migration_20251224_173001.down,
    name: '20251224_173001'
  },
];
