import simpleGit from 'simple-git';
import type { SimpleGitOptions } from 'simple-git';
const createLogger = require('progress-estimator');
import chalk from 'chalk';
import { log } from 'console';

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ['-', '+', '-'].map((item) => {
      return chalk.green(item);
    }),
  },
});

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 当前工作目录
  binary: 'git',
  maxConcurrentProcesses: 6, // 允许同时进行的最大进程数
};
export const clone = async (
  url: string,
  projectName: string,
  options: string[]
) => {
  const git = simpleGit(gitOptions);

  try {
    await logger(git.clone(url, projectName, options), '代码下载中...', {
      estimate: 7000,
    });
    console.log();
    console.log(chalk.green('下载成功'));
    console.log(chalk.blue('==============================='));
    console.log(chalk.blue('=========欢迎使用maple-cli======='));
    console.log(chalk.blue('==============================='));
    console.log();
    console.log();
    console.log(chalk.blue('=========请使用pnpm安装依赖======='));
    console.log(chalk.blue('======pnpm run dev 启动项目======='));
  } catch (error) {
    console.log(error);
  }
};
