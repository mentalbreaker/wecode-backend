const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function sendProducts(req, res) {
    try { 
        const productList = await prisma.$queryRaw`
            SELECT products.korean_name as product_name, categories.name as category
            FROM products
            LEFT JOIN categories ON products.category_id = categories.id
            ORDER BY products.category_id asc;`
        console.log('product list sending...');
        return res.status(200).json(productList);
    } catch (err) { 
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}
 
module.exports.sendProducts = sendProducts;