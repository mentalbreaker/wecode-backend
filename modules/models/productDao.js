const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategory = async () => { 
    return await prisma.$queryRaw`
    SELECT name FROM categories;
    `;
}

const getProducts = async () => {
    return await prisma.$queryRaw`
    SELECT 
        P.id
        ,categories.name as category
        ,P.korean_name as product_name
        ,P.english_name
    FROM 
        products P
    LEFT JOIN 
        categories 
    ON 
        P.category_id = categories.id
    ORDER BY
        P.category_id asc;`;
}

const getProductById = async (id) => { 
    return await prisma.$queryRaw`
    SELECT 
        products.korean_name
        ,products.english_name
        ,categories.name as category_name
        ,product_images.image_url
        ,nutritions.caffein
        ,nutritions.fat
        ,nutritions.sugar
        ,nutritions.sodium
        ,allergies.name as allergy_name
    FROM 
        products 
    LEFT OUTER JOIN 
        products_allergies 
    ON   
        products.id = products_allergies.product_id  
    JOIN 
        categories 
    ON 
        products.category_id = categories.id
    LEFT OUTER JOIN 
        product_images 
    ON 
        products.id = product_images.product_id
    LEFT OUTER JOIN 
        nutritions 
    ON 
        products.id = nutritions.product_id
    LEFT OUTER JOIN 
        allergies 
    ON 
        products_allergies.allergy_id = allergies.id     
    WHERE
        products.id = ${id}
    ORDER BY 
        categories.id asc;`
}
module.exports = {
    getCategory,
    getProducts,
    getProductById
}