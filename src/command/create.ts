import { input, select } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
export interface TemplateInfo {
  name: string; // 模板名称
  downloadUrl: string; // 模板下载地址
  description: string; // 模板描述
  branch: string; // 模板分支
}

export const tempaltes: Map<string, TemplateInfo> = new Map([
  [
    'Vite-Vue3-TypeScript-template',
    {
      name: 'Vite-Vue3-TypeScript-template',
      downloadUrl: 'git@gitee.com:zhang_yabo/pro_study.git',
      description: 'Vite + Vue3 + TypeScript 模板',
      branch: 'dev_04',
    },
  ],
  [
    'Vite-Vue3',
    {
      name: 'Vite-Vue3',
      downloadUrl: 'git@gitee.com:zhang_yabo/pro_study.git',
      description: 'Vite + Vue3 + TypeScript 模板',
      branch: 'dev_01',
    },
  ],
]);

export const isOverwrite = async (fileName: string) => {
  console.warn(`${fileName}文件夹已存在`);
  return select({
    message: '是否覆盖?',
    choices: [
      { name: '覆盖', value: true },
      { name: '取消', value: false },
    ],
  });
};

export async function create(projectName?: string) {
  // 初始化模板列表
  const templateList = Array.from(tempaltes).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item;
      return {
        name,
        value: name,
        description: info.description,
      };
    }
  );

  if (!projectName) {
    console.log(chalk.green('123456'));

    projectName = await input({ message: '请输入项目名称' });
  }

  // 如果文件夹存在,则提示是否覆盖
  const filePath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(filePath)) {
    console.log('文件夹存在');

    const run = await isOverwrite(filePath);

    if (run) {
      await fs.remove(filePath);
    } else {
      return; // 不覆盖直接结束
    }
  }

  const templateName = await select({
    message: '请选择模板',
    choices: templateList,
  });

  const info = tempaltes.get(templateName);
  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch]);
  }

  console.log(`create ${projectName}`);
}
