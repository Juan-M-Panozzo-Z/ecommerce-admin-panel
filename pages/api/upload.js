import multiparty from "multiparty";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";

export default async function handler(req, res) {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    console.log("Length: ", files.file.length);
    const client = new S3Client({
        region: "sa-east-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split(".").pop();
        const newFileName = Date.now() + "." + ext;
        console.log({ ext, file });
        await client.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: newFileName,
                Body: fs.readFileSync(file.path),
                ACL: "public-read",
                ContentType: mime.lookup(file.path),
            })
        );
        const link = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${newFileName}`;
        links.push(link);
    }
    return res.json({ links });
}

export const config = {
    api: { bodyParser: false },
};
