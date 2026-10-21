import sharp from "sharp";

const photos = ["sunset", "port", "coast"];
const targetWidths = [1024, 1280, 1355];

for (const photo of photos) {
  const input = `public/images/hero-malaga-${photo}.jpg`;
  const metadata = await sharp(input).metadata();
  const widths = targetWidths.filter((width) => width <= metadata.width);

  for (const width of widths) {
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(`public/images/hero-malaga-${photo}-${width}.webp`);
  }
}
