const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function sendCategories(req, res) {
    try {
        const categoryList = await prisma.$queryRaw`
        SELECT name as category FROM categories;`;
        console.log('category list sending...');
        return res.status(200).json(categoryList);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
    
}

module.exports.sendCategories =  sendCategories;