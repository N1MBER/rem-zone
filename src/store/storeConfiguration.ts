import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { ENV } from '../utils/constants/environment';
import { rootReducer } from './reducers';

const rootPersistConfig = {
  key: 'rootStorage',
  storage,
  whitelist: ['user', 'settings'],
};

const middleware: Middleware[] = [thunk];
if (ENV === 'dev') {
  const logger = createLogger({
    collapsed: true,
  });

  middleware.push(logger);
}
const pReducer = persistReducer(rootPersistConfig, rootReducer);
const store: Store = createStore(pReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { persistor, store };
