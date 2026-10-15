import fse from "fs-extra";
import imageMin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp";

let inputDir = "src";
let outputDir = "opt";
let targetWidth = 1920;

let processImage = async () => {
  try {
    const files = await fse.readdir(inputDir);

    for (const file of files) {
      let inputPath = `${inputDir}/${file}`;
      let outputPath = `${outputDir}/${file}`;

      await sharp(inputPath).resize(targetWidth).toFile(outputPath);

      await imageMin([outputPath], {
        destination: outputDir,
        plugins: [
          imageminJpegtran({ quality: 80 }), // Comprimie una imagen JPG con calidad del 80%
          imageminPngquant({ quality: [0.6, 0.8] }), // Comprime una imagen PNG con calidad entre 60% y 80%
          imageminSvgo(), // Comprime una imagen SVG
          // imageminWebp({ quality: 80 }), //Comprime una imagen WebP con calidad del 80%
          imageminGifsicle({ optimizationLevel: 2 }), //Comprime una imagen GIF con nivel de optimización 2
        ],
      });

      console.log(`Se ha optmizado la imagen ${file}.`);
    }

    console.log("\nSe ha completado el proceso de optimización de imágenes.");
  } catch (err) {
    console.error(err);
  }
};

processImage();
