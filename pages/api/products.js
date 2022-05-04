import getProducts from '../../src/services/get-products';

export default async function handler(reqest, response) {
    const products = await getProducts();

    console.log(products);
    response.status(200).json(products);
}
