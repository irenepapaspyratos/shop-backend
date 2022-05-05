import { dbConnect } from '../../../src/lib/database';
import Product from '../../../src/models/Product';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newProductData = JSON.parse(req.body);
        await dbConnect();

        const newProduct = await Product.create({
            name: newProductData.name,
            description: newProductData.description,
            price: newProductData.price,
            tags: newProductData.tags,
            category: newProductData.category,
        });

        res.status(200).json({
            message: 'product created',
            product: newProduct,
        });
    } else {
        res.status(400).json({ error: 'wrong method' });
    }
}
