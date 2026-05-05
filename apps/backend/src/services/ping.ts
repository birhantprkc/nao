import { env } from '../env';

const LICENSES_STARTUP_PING_URL = 'https://licenses.getnao.io/ping';
const STARTUP_PING_TIMEOUT_MS = 3_000;

export async function pingLicensesServer(): Promise<void> {
	if (env.MODE !== 'prod') {
		return;
	}

	try {
		const response = await fetch(LICENSES_STARTUP_PING_URL, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				betterAuthUrl: env.BETTER_AUTH_URL,
				naoVersion: env.APP_VERSION,
			}),
			signal: AbortSignal.timeout(STARTUP_PING_TIMEOUT_MS),
		});

		if (!response.ok) {
			console.warn(`[license] Startup ping failed with status ${response.status}`);
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		console.warn(`[license] Startup ping failed: ${message}`);
	}
}
