const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function sendProductDetail(req,res) { 
    try {
        const productDetail = await prisma.$queryRaw`
        SELECT P.korean_name,P.english_name, A.name as allergy_name,
        C.name as category, img.image_url, 
        N.caffein, N.fat, N.sugar, N.sodium
        FROM products P
        LEFT OUTER JOIN products_allergies as pro_aller 
        ON   P.id = pro_aller.product_id
        LEFT OUTER JOIN allergies A
        ON pro_aller.allergy_id = A.id
        JOIN categories C
        ON P.category_id = C.id
        LEFT OUTER JOIN product_images as img
        ON P.id = img.product_id
        LEFT OUTER JOIN nutritions N
        ON P.id = N.product_id
        WHERE P.id = ${req.params.id}
        ORDER BY C.id asc;
    `
        return res.status(200).json(productDetail);
    } catch (err) { 
        console.log(err);
        return res.status(500).json({ message: err.message });
     }
}

module.exports.sendProductDetail = sendProductDetail;