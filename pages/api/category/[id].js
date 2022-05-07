import Category from '../../../src/models/Category';
import { dbConnect } from '../../../src/lib/database';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.status(200).json({
            message: 'category deleted',
            category: deletedCategory,
        });
    } else if (req.method === 'PUT') {
        const newCategoryData = JSON.parse(req.body);
        await dbConnect();

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                name: newCategoryData.name,
                description: newCategoryData.description,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            message: 'category edited',
            product: updatedCategory,
        });
    } else {
        const singleCategory = await Category.findById(id);
        res.status(200).json(singleCategory);
    }
}
