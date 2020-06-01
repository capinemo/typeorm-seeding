module.exports = [
    {
        name: 'default',
        type: 'sqlite',
        database: 'test.db',
        entities: ['sample/entities/**/*{.ts,.js}'],
        factories: ['sample/factories/**/*{.ts,.js}'],
        seeds: ['sample/seeds/**/*{.ts,.js}'],
        "cli": {
            "migrationsDir": "./sample/migration"
        }
    },
    {
        name: 'memory',
        type: 'sqlite',
        database: ':memory:',
        entities: ['sample/entities/**/*{.ts,.js}'],
        factories: ['sample/factories/**/*{.ts,.js}'],
        seeds: ['sample/seeds/**/*{.ts,.js}'],
        "cli": {
            "migrationsDir": "./sample/migration"
        }
    }
]
