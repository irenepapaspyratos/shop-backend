import { dbConnect } from '../../../src/lib/database';
import Category from '../../../src/models/Category';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newCategoryData = JSON.parse(req.body);
        await dbConnect();

        const newCategory = await Category.create({
            name: newCategoryData.name,
            description: newCategoryData.description,
        });

        res.status(200).json({
            message: 'category created',
            category: newCategory,
        });
    } else {
        res.status(400).json({ error: 'wrong method' });
    }
}
