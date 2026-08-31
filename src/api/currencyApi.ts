import axios from 'axios';

const RATES_PATH =
  '/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

export async function getRates() {
  return axios.get<string>(`${baseUrl}${RATES_PATH}`);
}
