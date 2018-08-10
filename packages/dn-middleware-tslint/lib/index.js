const path = require('path');
const fs = require('fs');

module.exports = function (opts) {

  opts = Object.assign({
    tsconfig: './tsconfig.json'
  }, opts);

  return async function (next) {

    this.console.info('进行 TypeScript 检查');

    const tsconfigFile = path.resolve(this.cwd, opts.tsconfig);
    if (!fs.existsSync(tsconfigFile)) {
      throw new Error(`tsconfig: ${tsconfigFile} 不存在`);
    }

    const cmd = await this.utils.findCommand(__dirname, 'tslint');
    const rulesFile = path.resolve(__dirname, './tslint.json');

    await this.utils.exec([
      cmd, '--config', rulesFile, '--project', tsconfigFile,
      '--exclude', '**/*.d.ts', '--format', 'stylish', '--fix'
    ].join(' '));
  };

};