import { startServer } from './app';
import { pingLicensesServer } from './services/ping';

startServer({ port: 5005, host: '0.0.0.0' })
	.then(() => {
		void pingLicensesServer();
	})
	.catch((err) => {
		console.error('\n❌ Server failed to start:\n');
		console.error(`   ${err.message}\n`);
		process.exit(1);
	});
