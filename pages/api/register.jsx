import bcrypt from "bcryptjs";
import prisma from "../../utils/prisma";

export default async function handler(req, res) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const results = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            },
        });
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}