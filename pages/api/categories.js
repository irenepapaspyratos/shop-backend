import getCategories from '../../src/services/get-categories';

export default async function handler(reqest, response) {
    const categories = await getCategories();

    response.status(200).json(categories);
}
