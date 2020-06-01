import * as yargs from 'yargs'
import * as chalk from 'chalk'
import * as path from 'path'
import * as fs from 'fs'
import { configureConnection, createConnection, getConnectionOptions } from '../connection'
import { printError } from '../utils/log.util'
import { utilsHelper } from '../utils/args.helper.util'
import * as ora from 'ora'
import * as glob from 'glob'

/**
 * Apply new seed files
 */
export class SeedLoadCommand implements yargs.CommandModule {
  command = 'seed:load'
  describe = 'Runs all pending seeds'

  /**
   * Console helper builder
   *
   * @param args        List of options for application execution
   */
  builder(args: yargs.Argv): yargs.Argv {
    return utilsHelper(args)
  }

  /**
   * Generator handler execution
   *
   * @public
   * @async
   * @param args          Application execution arguments
   */
  async handler(args: yargs.Arguments): Promise<void> {
    const log = console.log
    const pkg = require('../../package.json')
    log('🌱  ' + chalk.bold(`TypeORM Seeding v${(pkg as any).version}`))
    const spinner = ora('Applying seeds').start()
    let option

    try {
      configureConnection({
        root: args.root as string,
        configName: args.configName as string,
        connection: args.connection as string,
      })
      option = await getConnectionOptions()
      spinner.succeed('ORM Config loaded')
    } catch (error) {
      printError('Could not find the orm config file', error)
      process.exit(1)
    }

    if (!option.cli.seedsDir) {
      console.error('Not found seedsDir parameter in ormconfig')
      process.exit(1)
    }

    const migrationTable = option.migrationsTableName || 'migrations'
    const connector = await createConnection();
    await connector.query('SELECT * FROM migrations', [migrationTable]));
    console.log(await connector.query('SELECT * FROM migrations', [migrationTable]));
    await connector.close();



    console.log(glob.sync(path.resolve(option.cli.seedsDir)), path.resolve(option.cli.seedsDir))
    spinner.succeed('ORM Config loaded')
    process.exit(0)
  }
}
