// import 'reflect-metadata';
// import { runSeeders } from 'typeorm-extension';
// import { AppDataSource } from '../data-source';
// import { Logger } from 'winston';

// const logger = new Logger()

// async function run() {
//     await AppDataSource.initialize();
//     logger.info('📌 Database connected, running seeders...');

//     await runSeeders(AppDataSource);

//     logger.info('✅ Seeding completed!');
//     await AppDataSource.destroy();
// }

// run().catch((err) => logger.error('❌ Seeding failed:', err));
