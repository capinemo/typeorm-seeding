import * as yargs from 'yargs'

export class SeedGenerateCommand implements yargs.CommandModule {
  command = 'seed:generate'
  describe = 'Generates a new file with Seeder implementing class'

  builder(args: yargs.Argv) {
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

  async handler(args: yargs.Arguments) {

  }
}
