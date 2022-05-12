import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    try {
        const results = await prisma.product.findMany();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}