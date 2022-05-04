import { getStatData } from '../../src/services/get-data';

export default async function handler(reqest, response) {
    const products = await getStatData('products');

    console.log(products);
    response.status(200).json(products);
}
