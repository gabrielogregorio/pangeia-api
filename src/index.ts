import { app } from './app';
import { PORT } from './config/envs';
import { Database } from './database';
import { LogService } from './services/log';

new Database({ verbose: true })
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      LogService.info(`Server Running in localhost: ${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
