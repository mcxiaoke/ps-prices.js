const util = require("util");
const fsWalk = require("@nodelib/fs.walk");
const fs = require("fs-extra");
const { URL, URLSearchParams } = require("url");
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");
const path = require("path");
const { showFor, pick, isIterable } = require("./misc");
const proxy = process.env.http_proxy || "http://127.0.0.1:2081";
const agent = new HttpsProxyAgent(proxy);
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const store = require("./store");
const dayjs = require("dayjs");

const UA_VALUE =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36";

async function parseGameSale(filepath) {
  const data = await fs.readFile(filepath, { encoding: "utf8" });
  const $ = cheerio.load(data);
  let elements = $("#gamesale > tbody > tr");
  const idRe = /\/game\/(\d+)/;
  let games = Array.from(elements).map((elem) => {
    const link = $(elem).find("td.game-sale-name > a");
    const full_name = link.text().trim().replace(/\s+/g, " ");
    // if (link.text().trim() !== full_name) {
    //   console.log(link.text().trim());
    // }
    const name = full_name.split("(")[0].trim();
    const url = link.attr("href");
    const idMatch = idRe.exec(url);
    const platid = (idMatch && idMatch[1]) || "";
    const cover = `https://imgcdn.platprices.com/prod_img/${platid}_340.webp`;
    const plus = $(elem).find("td:nth-child(2)").text().trim();
    const sale = $(elem).find("td:nth-child(3)").text().trim();
    const off = $(elem).find("td:nth-child(4)").text().trim();
    // console.log("parseGameSale item:", name, platid, url);
    return { platid, name, full_name, cover, url, plus, sale, off };
  });
  console.log("parseGameSale", games.length, filepath);
  return games;
}

async function saveGameSales() {
  // expired
  // const list1 = await parseGameSale(
  //   "./data/platprices/1177-psn-sale-august-3-2021-hong-kong.html"
  // );
  const list2 = await parseGameSale(
    "./data/platprices/1225-psn-sale-august-17-2021-hong-kong.html"
  );
  // const games = list1.concat(list2);
  const games = list2;
  console.log("saveGameSales", list2.length, games.length);
  const dateStr = dayjs().format("YYYYMMDD");
  await fs.writeJSON(`./data/platprices/sale-${dateStr}.json`, games, {
    spaces: 2,
  });
  await fs.writeFile(
    `./data/platprices/sale-${dateStr}-names.txt`,
    games.map((it) => it.full_name).join("\n"),
    {
      spaces: 2,
    }
  );
}

async function loadGameSales() {
  const dateStr = dayjs().format("YYYYMMDD");
  return await fs.readJSON(`./data/platprices/sale-${dateStr}.json`, {
    encoding: "utf8",
  });
}

const ss = require("string-similarity");
const fl = require("fastest-levenshtein");
const cleanNameRe =
  /([™®'\-\+&]|digital|edition|full|complete|version|game|playstation|hits|\s)/gi;
function computeSimilarity(name1, name2) {
  let s1 = name1.replace(cleanNameRe, "").toLowerCase();
  let s2 = name2.replace(cleanNameRe, "").toLowerCase();
  const score1 = ss.compareTwoStrings(s1, s2);
  const score2_ = fl.distance(s1, s2);
  const score2 =
    (Math.max(s1.length, s2.length) - score2_) / Math.max(s1.length, s2.length);
  let score3 = 0;
  if (!s1 || !s2 || s1.length === 0 || s2.length === 0) {
    console.log(s1 || "-", name1, s2 || "-", name2, score1, score2);
    score3 = 0;
  } else {
    score3 = s1.length > 4 && s2.length > 4 && s1 === s2 ? 1 : 0;
  }
  const score = Math.floor(Math.max(score1, score2, score3) * 100);
  return [s1, s2, score];
}

const compreScore = (a, b) => b.score - a.score;
async function findBestMatch(sale, games) {
  // console.log("findBestMatch", sale.name, games.length);
  games = games.map((game) => {
    const [s1, s2, score] = computeSimilarity(sale.name, game.en_name);
    return { s1, s2, score, game };
  });
  games.sort(compreScore);
  // games = games.filter((it) => it.score > 60);
  const r = {
    sale: sale,
    score: games[0].score,
    first: games[0].game,
    firstM: games[0].s2,
    firstScore: games[0].score,
    second: games[1].game,
    secondM: games[1].s2,
    secondScore: games[1].score,
  };
  // if (
  //   r.sale.name.includes("Elea") ||
  //   r.first.name_long.includes("Elea") ||
  //   r.second.name_long.includes("Elea")
  // ) {
  //   console.log(r.sale);
  //   console.log(
  //     games[0].score,
  //     `s1:${games[0].s1}`,
  //     `s2:${games[0].s2}`,
  //     r.first.name_long,
  //     r.first.en_name_long,
  //     r.first.id
  //   );
  //   console.log(
  //     games[1].score,
  //     `s1:${games[1].s1}`,
  //     `s2:${games[1].s2}`,
  //     r.second.name_long,
  //     r.second.en_name_long,
  //     r.second.id
  //   );
  // }
  return r;
}

function makeListPage(games) {
  const head = `[tbl][center]封面[/center],[center]游戏名称[/center],[center]会员[/center],[center]非会员[/center],[center]折扣[/center]`;
  let content = head + "\n";
  for (const g of games) {
    let line = `[img=60]${g.cover2 || g.cover}?w=180[/img],`;
    line += `[url=${g.storeUrl}][b]${g.name}[/b][/url][br]${g.en_name_short},`;
    if (g.plus && g.plus != g.sale) {
      line += `[center][color=blue]${g.plus}[/color][/center],`;
    } else {
      line += `[center]${g.plus || "---"}[/center],`;
    }

    line += `[center]${g.sale}[/center],`;
    if (g.off_value >= 75) {
      line += `[center][color=red]${g.off}[/color][/center]`;
    } else {
      line += `[center]${g.off}[/center]`;
    }
    content += line + "\n";
  }
  content += "[/tbl]";
  return content;
}

async function makeSalePage() {
  const allGames = await store.loadAll();
  let saleGames = await loadGameSales();
  console.log("makeSalePage", allGames.length, saleGames.length);
  let results = await Promise.all(
    saleGames.map(async (it) => await findBestMatch(it, allGames))
  );
  const skipped = results.filter((it) => it.score < 80);
  results = results.filter((it) => it.score > 80);
  if (skipped.length > 0) {
    console.log("makeSalePage skippped count:", skipped.length);
    for (const s of skipped) {
      console.log(`--------------------`);
      console.log(s.score, s.sale.name, s.first.id);
      console.log(s.firstScore, s.first.en_name_long, s.firstM);
      // console.log(s.secondScore, s.second.en_name_long, s.secondM);
    }
  }
  results = results.map((it) => {
    const value = {
      id: it.first.id,
      name: it.first.name_long.replace(/[,\[\]\/]/g, "|"),
      name_short: it.first.name,
      name_long: it.first.name_long,
      en_name_short: it.first.en_name,
      en_name: it.first.en_name_long.replace(/[,\[\]\/]/g, "|"),
      en_name_long: it.first.en_name_long,
      cover: it.sale.cover,
      cover2: it.first.img_master || it.first.img_art || it.first.img_bg,
      url: it.url,
      storeUrl: `https://store.playstation.com/zh-hans-hk/product/${it.first.id}/`,
      price: it.first.price,
      sale: it.sale.sale,
      plus: it.sale.plus,
      off: it.sale.off,
      off_value: parseInt(it.sale.off),
    };
    // different edtions may have same psn id, but name is not same
    const key = value.id + "-" + value.name_long + "-" + value.en_name_long;
    return [key, value];
  });
  let gameMap = new Map(results);
  console.log("makeSalePage", results.length, gameMap.size);
  let listByName = Array.from(gameMap.values());
  listByName.sort((a, b) =>
    a.en_name > b.en_name ? 1 : b.en_name > a.en_name ? -1 : 0
  );
  let listByOff = Array.from(gameMap.values());
  listByOff.sort((a, b) => b.off_value - a.off_value);

  const dateStr = dayjs().format("YYYYMMDD");
  const headDesc =
    "\n以Plat Prices网站的折扣页面游戏名列表为基础，采用Playstation Store网站上的官方中文名称和封面图片，点击游戏名可以直接跳转到商城页面，第一次制作这类表格，请多多提意见\n\n";
  let page1 = makeListPage(listByName);
  let page2 = makeListPage(listByOff);
  let content = "";
  content += headDesc;
  content += "[title] 游戏名排序[/title]\n";
  content += page1;
  content += "[title] 折扣排序[/title]\n";
  content += page2;
  await fs.writeFile(`./data/platprices/content-${dateStr}.txt`, content, {
    encoding: "utf8",
  });
}

async function main() {
  await saveGameSales();
  await makeSalePage();
}

if (require.main.filename === __filename) {
  main();
}
