import prisma from "../../../../utils/prisma";
import formidable from "formidable";
import fs from "fs";

export const config = {
    api:{
      bodyParser: false,
    },
  }; 

const saveFile = async (file, id) => {
    const data = fs.readFileSync(file.filepath);
    if(!fs.existsSync(`./public/${id}`)) {
        fs.mkdirSync(`./public/${id}`);
    }
    fs.writeFileSync(`./public/${id}/${file.originalFilename}`, data);
    await fs.unlinkSync(file.filepath);

    await prisma.image.create({
        data: {
            name: file.originalFilename,
            productId: id
        },
    });

    return;
};

export default async function handler(req, res) {
    try {
        const { id } = req.query

        const form = new formidable.IncomingForm();
        
        form.parse(req, async (err, fields, files) => {
            console.log(files.file)
            await saveFile(files.file, id);

            return res.status(201).send("");
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}