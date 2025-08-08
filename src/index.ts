// export const add = (a: number, b: number) => {
//   return a + b;
// };
import { Command } from 'commander';
import { version } from '../package.json';
import { create } from './command/create';
import { log } from 'console';

const program = new Command('maple-cli');
program.version(version, '-v --version');

program
  .command('create')
  .description('创建项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    create(dirName);
    // console.log('123');

    // if (dirName) {
    //   create(dirName)
    // } else {
    //   console.log(`create ${dirName}`);

    // }
  });

program.parse();
