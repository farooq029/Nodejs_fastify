const cheerio = require("cheerio");
const fs = require("fs");
const clipboardy = require("clipboardy");

const text = fs.readFileSync(__dirname + "/../files/Test A 01.html").toString();
const $ = cheerio.load(text);

const newDocument = $("<div>");

function pushQuestion(quest, ans) {
  const container = $("<div>");

  quest.appendTo(container);
  ans.appendTo(container);

  newDocument.append(container);

  $("<hr>").appendTo(container);
}

for (let path of fs.readdirSync(__dirname + "/../files")) {
  let text = fs.readFileSync(__dirname + "/../files/" + path);
  let $ = cheerio.load(text);

  let i = 1;

  while (
    $(`#div${i} div:nth-child(2) div:nth-child(1) span:nth-child(3)`).length > 0
  ) {
    const quest = $(
      `#div${i} div:nth-child(2) div:nth-child(1) span:nth-child(3)`
    );
    const ans = $(`#div${i} div:nth-child(2) div:nth-child(2)`);

    i++;

    pushQuestion(quest, ans);
  }
}

const styling =
  "<style>.rightanswer { color: green } .hidden { display: none }</style>";

clipboardy.writeSync(styling + newDocument);

fs.writeFileSync(__dirname + "/../answers.html", styling + newDocument.html());
