import configureStore from './config';
import api from '../services/api'

const store = configureStore({}, { api });

export default store;
