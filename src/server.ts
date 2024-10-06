import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import app from './app';
import errorHandler from './middleware/errorHandler';
import container from './inversify.config';

const PORT = process.env.PORT || 3000;

// 1st null is for custom router, 2nd null is for custom routing config
const server = new InversifyExpressServer(container, null, null, app);

server.setErrorConfig((application) => {
  application.use(errorHandler);
});

const serverInstance = server.build();

serverInstance.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
