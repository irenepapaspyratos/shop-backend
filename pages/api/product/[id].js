import Product from '../../../src/models/Product';
import { dbConnect } from '../../../src/lib/database';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: 'product deleted',
            product: deletedProduct,
        });
    } else if (req.method === 'PUT') {
        const newProductData = JSON.parse(req.body);
        await dbConnect();

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            newProductData,
            {
                new: true,
            }
        );

        res.status(200).json({
            message: 'product edited',
            product: updatedProduct,
        });
    } else {
        const singleProduct = await Product.findById(id);
        res.status(200).json(singleProduct);
    }
}
