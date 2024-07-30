import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com',
  headers: {
    'Accept-Encoding': 'gzip',
  },
});

const httpAdapter = {
  get: <T>(url: string, params = {}) =>
    api.get<T>(url, {
      params: {
        ...params,
        apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
      },
    }),
};

export default httpAdapter;
