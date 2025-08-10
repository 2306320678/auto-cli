import chalk from 'chalk';
import ora from 'ora';
import process from 'child_process';

const spinner = ora({
  text: 'maple-cli 正在更新...',
  spinner: {
    interval: 100,
    frames: ['-', '+', '-'].map((item) => {
      return chalk.blue(item);
    }),
  },
});
export async function update() {
  spinner.start();
  process.exec('npm install -g maple-cli@latest', (error, stdout, stderr) => {
    if (error) {
      spinner.fail('更新失败');
      console.log(chalk.red(error));
    } else {
      spinner.succeed('更新成功');
      console.log(chalk.green("更新成功"));
    }
  });
}