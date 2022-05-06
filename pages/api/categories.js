import getCategories from '../../src/services/get-categories';

export default async function handler(reqest, response) {
    const categories = await getCategories();

    console.log('/api/categories: ', categories);

    response.status(200).json(categories);
}
