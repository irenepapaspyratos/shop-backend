export default function handler(request, response) {
    if (request.method === 'POST') {
        const newProduct = JSON.parse(request.body);

        response.status(200).json({
            message: 'Product Create',
            card: newProduct,
        });
    } else {
        response.status(400).json({ error: 'Wrong Method' });
    }
}
