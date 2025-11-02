import {type Context, Hono} from 'hono';
import {serveStatic} from 'hono/bun';

const app = new Hono();

// Serve static files from public directory.
app.use('/*', serveStatic({root: './public'}));

app.get('/greet', (c: Context) => {
  // Return a Response whose body contains
  // the version of Bun running on server.
  return c.html('<hello-world name="Hono"></hello-world>');
});

app.get('/version', (c: Context) => {
  // Return a Response whose body contains
  // the version of Bun running on server.
  return c.text('v' + Bun.version);
});

export default app;
