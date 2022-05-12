import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    try {
        const results = await prisma.cart.findMany({
            where: {
                userId: req.body.userId
            },
            include: {
                product: true
            }
        });
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}