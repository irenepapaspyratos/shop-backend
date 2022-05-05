import Category from '../../../src/models/Category';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.status(200).json({
            message: 'category deleted',
            product: deletedCategory,
        });
    } else {
        const singleCategory = await Category.findById(id);
        res.status(200).json(singleCategory);
    }
}
