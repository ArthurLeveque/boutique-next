import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    try {
        const results = await prisma.product.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                userId: req.body.userId
            },
        });
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}