import Category from '../models/Category';
import { dbConnect } from '../lib/database';

export default async function getCategories() {
    await dbConnect();

    const categories = await Category.find();
    console.log('get-Categories: ', categories);

    return categories.map(({ id, name, description }) => ({
        id,
        name,
        description,
    }));
}
