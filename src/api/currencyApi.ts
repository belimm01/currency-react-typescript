import axios from 'axios';

const RATES_PATH =
  '/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt';

// Defaults to a relative path so the dev-server / nginx proxy handles CORS.
// Override with VITE_API_BASE_URL to point directly at a reachable origin.
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

export async function getRates() {
  return axios.get<string>(`${baseUrl}${RATES_PATH}`);
}
