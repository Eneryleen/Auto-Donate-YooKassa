import { Rcon } from 'rcon-client';
import siteConfig from '@/config/site.config';

export async function executeRconCommand(username: string): Promise<void> {
  const { host, port, password, command } = siteConfig.rcon;

  if (!host || !password) {
    throw new Error('RCON configuration is incomplete');
  }

  const rcon = new Rcon({
    host,
    port,
    password,
  });

  try {
    await rcon.connect();

    const finalCommand = command.replace('{username}', username);
    await rcon.send(finalCommand);

    console.log(`RCON command executed for user ${username}: ${finalCommand}`);
  } catch (error) {
    console.error('RCON command execution failed:', error);
    throw new Error(`Failed to execute RCON command: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    await rcon.end();
  }
}

export async function testRconConnection(): Promise<boolean> {
  const { host, port, password } = siteConfig.rcon;

  const rcon = new Rcon({
    host,
    port,
    password,
  });

  try {
    await rcon.connect();
    await rcon.end();
    return true;
  } catch {
    return false;
  }
}
