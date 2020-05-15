import * as yargs from 'yargs'

/**
 * Generates common cli helper
 */
export const utilsHelper = (args: yargs.Argv): yargs.Argv => {
  return args
    .option('n', {
      alias: 'configName',
      default: '',
      describe: 'Name of the typeorm config file (json or js).',
    })
    .option('c', {
      alias: 'connection',
      default: '',
      describe: 'Name of the typeorm connection',
    })
    .option('r', {
      alias: 'root',
      default: process.cwd(),
      describe: 'Path to your typeorm config file',
    })
}
