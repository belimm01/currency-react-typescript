import axios from "axios";

export async function getRates() {
    return axios.get('/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt');
}