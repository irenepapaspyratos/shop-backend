import Category from '../models/Category';
import { dbConnect } from '../lib/database';

export default async function getCategories() {
    await dbConnect();

    const categories = await Category.find();
    return categories.map(({ id, description, name }) => ({
        id,
        description,
        name,
    }));
}
