// pages/api/upload.js
import { IncomingForm } from "formidable";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import { createClient } from "utils/supabase/server";

export const config = {
  api: {
    bodyParser: false, // Para processar formulários com arquivos grandes
  },
};

const uploadFile = async (req, res) => {
  const form = new IncomingForm();
  form.uploadDir = "./uploads"; // Pasta temporária
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: "Erro ao processar o upload." });
      return;
    }

    const file = files.file.path; // Caminho do arquivo original
    const outputFile = `./uploads/${Date.now()}_converted.webm`;

    const supabase = createClient();

    // Converter o vídeo usando ffmpeg
    ffmpeg(file)
      .output(outputFile)
      .on("end", async () => {
        // Fazer upload para o Supabase após a conversão
        const { data, error } = await supabase.storage
          .from("video-bucket")
          .upload(
            `videos/${Date.now()}_converted.webm`,
            fs.createReadStream(outputFile),
            {
              cacheControl: "3600",
              upsert: false,
            }
          );

        if (error) {
          res
            .status(500)
            .json({ message: "Erro ao fazer upload para o Supabase." });
        } else {
          // Remover arquivos temporários após upload
          fs.unlinkSync(file);
          fs.unlinkSync(outputFile);
          res
            .status(200)
            .json({ message: "Upload e conversão bem-sucedidos!", data });
        }
      })
      .on("error", (err) => {
        console.error("Erro ao converter o vídeo:", err);
        res.status(500).json({ message: "Erro ao converter o vídeo." });
      })
      .run();
  });
};

export default uploadFile;
