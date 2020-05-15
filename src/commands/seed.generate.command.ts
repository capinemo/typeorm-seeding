import * as yargs from 'yargs'
import * as chalk from 'chalk'
import { configureConnection, getConnectionOptions } from '../connection'
import { printError } from '../utils/log.util'
import { utilsHelper } from '../utils/args.helper.util'

export class SeedGenerateCommand implements yargs.CommandModule {
  command = 'seed:generate'
  describe = 'Generates a new file with Seeder implementing class'

  builder(args: yargs.Argv) {
    return utilsHelper(args).option('f', {
      alias: 'fileName',
      default: '',
      describe: 'Name of new seeding file',
    })
  }

  async handler(args: yargs.Arguments) {
    const log = console.log
    const pkg = require('../../package.json')
    log('🌱  ' + chalk.bold(`TypeORM Seeding v${(pkg as any).version}`))

    let seedsDirs: string
    try {
      configureConnection({
        root: args.root as string,
        configName: args.configName as string,
        connection: args.connection as string,
      })
      const option = await getConnectionOptions()
      seedsDirs = option.cli.seedsDir
    } catch (error) {
      printError('Could not find the orm config file', error)
      process.exit(1)
    }

    console.log(seedsDirs)

    process.exit(0)
  }
}
