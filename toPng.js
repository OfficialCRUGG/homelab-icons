const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [
    16, 24, 32, 48, 64, 100, 128, 200, 256, 500, 512, 1000, 1024, 2000, 2048,
    3000, 4000, 5000,
];

if (!fs.existsSync("png")) {
    fs.mkdirSync("png");
}

sizes.forEach((size) => {
    if (!fs.existsSync("png/" + size)) {
        fs.mkdirSync("png/" + size);
    }
});

fs.readdirSync(path.join(__dirname, "svg")).forEach((file) => {
    sizes.forEach((size) => {
        resize(file, size);
    });
});

function resize(file, size) {
    sharp(path.join(__dirname, "svg", file))
        .resize(size, size)
        .png()
        .toFile("png/" + size + "/" + file.replace(".svg", ".png"));
}
