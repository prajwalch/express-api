/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.NODE_ENV || 2058;
const { log, error: logError } = console;

mongoose.connect(
  process.env.DB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return logError(err);
    log('[pcx] database connected successfully');
    const server = app.listen(PORT, () => {
      log(`[pcx] server started at: http://localhost:${PORT}/\n`);

      process.on('SIGINT', async () => {
        log('[pcx] shutting down server...');
        log('[pcx] shutting down http server...');
        server.close((httpError) => {
          if (httpError) return process.exit(1);
          log('[pcx] http server shutdown successfully...');
          log('[pcx] closing database connection...');
          mongoose.connection.close(true, (dbError) => {
            if (dbError) return logError(dbError);
            log('[pcx] database connection closed');
            log('[pcx] server shutdown successfully');
            return process.exit(0);
          });
        });
      });
    });
  }
);
