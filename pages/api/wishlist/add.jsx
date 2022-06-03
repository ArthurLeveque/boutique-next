import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    try {
        const product = await prisma.wishlist.findFirst({
            where: {
                productId: req.body.productId,
                userId: req.body.userId
            }
        });

        if(!product) {
            await prisma.wishlist.create({
                data: {
                    productId: req.body.productId,
                    userId: req.body.userId,
                }
            })
        }
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}