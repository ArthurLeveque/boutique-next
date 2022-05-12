import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { setCookies } from 'cookies-next';

export default async function handler(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
              email: req.body.email,
            }
        });
        if (!user) {
          res.status(400).json({ status: "error", error: "User Not Found" });
        } else {
          const validPassword = await bcrypt.compare(req.body.password, user.password);
          if (!validPassword) return res.status(400).send('Invalid Password.')

          const token = jsonwebtoken.sign({user: {
              id: user.id,
              name: user.name,
              email: user.email
          }}, process.env.TOKEN_SECRET);

          console.log({ user, token })

          setCookies('token', token, { req, res });
          setCookies('userId', user.id, { req, res });

          return res.status(200).json({ user, token });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}