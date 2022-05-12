import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    try {
        const product = await prisma.cart.findFirst({
            where: {
                productId: req.body.productId,
                userId: req.body.userId
            }
        });

        if(product) {
            await prisma.cart.update({
                where: {
                    id: product.id
                },
                data: {
                    quantity: product.quantity + 1
                }
            })
        } else {
            await prisma.cart.create({
                data: {
                    productId: req.body.productId,
                    userId: req.body.userId,
                    quantity: 1
                }
            })
        }
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}