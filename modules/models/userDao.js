const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = async (email) => { 
    return await prisma.$queryRaw`
    SELECT email FROM users WHERE email= ${email};`;
}

const getUserInfoByEmail = async (email) => { 
    return await prisma.$queryRaw`
    SELECT id,password FROM users WHERE email= ${email};`;
}

const createUser = async (email, encryptPw,username,address,phone_number) => { 
    return await prisma.$queryRaw`
    INSERT INTO users(email,password,username,address,phone_number) VALUES 
    (${email},${encryptPw},${username},${address},${phone_number});`;
}
const showUser = async (email) => { 
    return await prisma.$queryRaw`
    SELECT email,username,address,phone_number FROM users
    WHERE email=${email};`
}
const showUsers = async () => { 
    return await prisma.$queryRaw`
    SELECT email,password,username,address,phone_number FROM users;`
}

const updateUser = async (email, password, username, address, phone_number) => { 
    return await prisma.$queryRaw`
    UPDATE users
    SET password =${password}, username=${username}, address=${address}, phone_number=${phone_number}
    WHERE email=${email};
    `
}
const deleteUserByEmail = async (email)=>{ 
    return  await prisma.$queryRaw
    `DELETE FROM users WHERE email=${email};`;
}
  
module.exports = {
    getUserByEmail,
    getUserInfoByEmail,
    createUser,
    showUser, showUsers,
    updateUser,
    deleteUserByEmail
};