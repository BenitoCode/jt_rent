import path from "node:path";
import sharp from "sharp";

const imageDirectory = path.join(process.cwd(), "public", "images");
const jobs = [];

for (const name of [
  "hero-malaga-sunset",
  "hero-malaga-port",
  "hero-malaga-coast",
]) {
  for (const width of [400, 512, 576, 640, 704, 800]) {
    jobs.push(
      sharp(path.join(imageDirectory, `${name}.jpg`))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 64, effort: 6 })
        .toFile(path.join(imageDirectory, `${name}-${width}.webp`)),
    );
  }
}

for (const width of [384, 576, 640, 672, 768]) {
  jobs.push(
    sharp(path.join(imageDirectory, "jt-rent-founders.jpeg"))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 60, effort: 6 })
      .toFile(path.join(imageDirectory, `jt-rent-founders-${width}.webp`)),
  );
}

for (const width of [384, 512, 640]) {
  jobs.push(
    sharp(path.join(imageDirectory, "kymco-side.jpeg"))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, effort: 6 })
      .toFile(path.join(imageDirectory, `kymco-side-${width}.webp`)),
  );
}

jobs.push(
  sharp(path.join(imageDirectory, "logo-jt.png"))
    .resize({ width: 256, height: 256, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(path.join(imageDirectory, "logo-jt.webp")),
);

const results = await Promise.all(jobs);
for (const image of results) {
  console.log(`${image.width}x${image.height}: ${(image.size / 1024).toFixed(1)} KiB`);
}
