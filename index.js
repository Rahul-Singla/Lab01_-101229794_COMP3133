var fs = require("fs");
var csv = require("csv-parser");

// 1. Delete canada.txt and usa.txt if already exist using fs module
if (fs.existsSync("./canada.txt")) {
    fs.unlinkSync("./canada.txt");
}
if (fs.existsSync("./usa.txt")) {
    fs.unlinkSync("./usa.txt");
}

// 2. Filter data of Canada and write data to canada.txt and 3. Filter data of United States and write data to usa.txt
let canada = [];
let usa = [];
fs.createReadStream("./input_countries.csv")
    .pipe(csv())
    .on("data", (data) => {
        if (data.country == "Canada") {
            canada.push(data);
        } else if (data.country == "United States") {
            usa.push(data);
        }
    })
    .on("end", () => {
        // Writing canada.txt
        let canadaWriteStream = fs.createWriteStream("./canada.txt");
        canadaWriteStream
            .once("open", function () {
                canadaWriteStream.write("country,year,population\n");
                canada.forEach((row) => {
                    canadaWriteStream.write(`${row.country},${row.year},${row.population}\n`);
                });
                canadaWriteStream.end();
            })
            .once("close", function () {
                console.log("canada.txt has been written");
            });

        // Writing usa.txt
        let usaWriteStream = fs.createWriteStream("./usa.txt");
        usaWriteStream
            .once("open", function () {
                usaWriteStream.write("country,year,population\n");
                usa.forEach((row) => {
                    usaWriteStream.write(`${row.country},${row.year},${row.population}\n`);
                });
                usaWriteStream.end();
            })
            .once("close", function () {
                console.log("usa.txt has been written");
            });
    });
