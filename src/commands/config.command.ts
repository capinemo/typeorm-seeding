import * as yargs from 'yargs'
import * as chalk from 'chalk'
import { printError } from '../utils/log.util'
import { configureConnection, getConnectionOptions } from '../connection'
import { utilsHelper } from '../utils/args.helper.util'

export class ConfigCommand implements yargs.CommandModule {
  command = 'config'
  describe = 'Show the TypeORM config'

  builder(args: yargs.Argv) {
    return utilsHelper(args)
  }

  async handler(args: yargs.Arguments) {
    const log = console.log
    const pkg = require('../../package.json')
    log('🌱  ' + chalk.bold(`TypeORM Seeding v${(pkg as any).version}`))
    try {
      configureConnection({
        root: args.root as string,
        configName: args.configName as string,
        connection: args.connection as string,
      })
      const option = await getConnectionOptions()
      log(option)
    } catch (error) {
      printError('Could not find the orm config file', error)
      process.exit(1)
    }
    process.exit(0)
  }
}
