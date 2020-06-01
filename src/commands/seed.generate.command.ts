import * as yargs from 'yargs'
import * as chalk from 'chalk'
import * as path from 'path';
import * as fs from 'fs';
import { configureConnection, getConnectionOptions } from '../connection'
import { printError } from '../utils/log.util'
import { utilsHelper } from '../utils/args.helper.util'

/**
 * New seed file auto-generator
 */
export class SeedGenerateCommand implements yargs.CommandModule {
  command = 'seed:generate'
  describe = 'Generates a new file with Seeder implementing class'

  /**
   * Console helper builder
   *
   * @param args        List of options for application execution
   */
  builder(args: yargs.Argv): yargs.Argv {
    return utilsHelper(args).option('f', {
      alias: 'fileName',
      default: '',
      describe: 'Name of generating seed file',
    })
  }

  /**
   * Command execution hadling
   *
   * @public
   * @async
   * @param args          Application execution arguments
   */
  async handler(args: yargs.Arguments): Promise<void> {
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
      seedsDirs = option.cli.migrationsDir
    } catch (error) {
      printError('Could not find the orm config file', error)
      process.exit(1)
    }

    if (!args.fileName) {
      console.error('Need name for generating seed file')
      process.exit(1)
    }

    const timestamp = Date.now();
    const generatedName = `${timestamp}-seed-${args.fileName as string}.ts`
    const fullPath = path.resolve(seedsDirs);
    const fileName = path.join(fullPath, generatedName).normalize();
    const fileContent = SeedGenerateCommand.generateSeedFile(args.fileName as string, timestamp.toString());

    !fs.existsSync(fullPath) && fs.mkdirSync(fullPath, { recursive: true });
    !fs.existsSync(fileName) && fs.writeFileSync(fileName, fileContent);

    console.log(chalk.green(`Seed file ${chalk.blue(fileName)} has been generated successfully.`));
    process.exit(0)
  }

  /**
   * Creates content for new seed file
   *
   * @protected
   * @static
   * @param fileName      File name given by execution argument
   * @param timestamp     Current timestamp
   * @returns             Seed file content
   */
  protected static generateSeedFile (fileName: string, timestamp: string): string {
    const validName = fileName.replace(/^([a-z])|^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, p3, offset) {
      if (offset === 0) return p1.toUpperCase();
      if (p3) return p3.toUpperCase();
      return p2.toLowerCase();
    })
    const migrationName = `Seed${timestamp}${validName}`;

    return `import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export class ${migrationName} implements Seeder {
    public async run (factory: Factory, connection: Connection): Promise<any> {

    }
}
`;
  }
}
