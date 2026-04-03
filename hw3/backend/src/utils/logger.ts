import { Logging } from '@google-cloud/logging';

const logging = new Logging();
const log = logging.log('user-actions');

export async function logUserAction(message: string, metadata: object) {
  const entry = log.entry({ resource: { type: 'global' } }, {
    message: message,
    ...metadata,
    timestamp: new Date()
  });
  
  await log.write(entry);
  console.log(`[Cloud Log]: ${message}`);
}