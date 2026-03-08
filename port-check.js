import getPort from 'get-port';

const PORT = 5173;
const availablePort = await getPort({port: PORT});
if (availablePort !== PORT) {
  console.error(`Port ${PORT} is already in use.`);
  process.exit(1);
}
