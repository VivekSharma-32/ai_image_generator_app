import axios from 'axios';

const BASE_URL = 'https://server-generateai-app.vercel.app/api';

export const api = axios.create({
  baseURL: BASE_URL,
});
