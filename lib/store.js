const _ = require("lodash");
const util = require("util");
const fsWalk = require("@nodelib/fs.walk");
const fs = require("fs-extra");
const { URL, URLSearchParams } = require("url");
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");
const path = require("path");
const { showFor } = require("./misc");
const { createDB } = require("./jsondb");
const dayjs = require("dayjs");

const proxy = process.env.http_proxy || "http://127.0.0.1:2081";
const agent = new HttpsProxyAgent(proxy);

const UA_VALUE =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36";

const STORE_PS4_GAMES_LIST =
  "https://store.playstation.com/zh-hans-hk/category/5f3aa730-1c8e-4a18-84da-030bb91558c0/1";
const STORE_PS5_GAMES_LIST =
  "https://store.playstation.com/zh-hans-hk/category/d71e8e6d-0940-4e03-bd02-404fc7d31a31/1";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getMonth() {
  return dayjs().format("YYYYMM");
}

async function walk(root, options) {
  const cpuCount = require("os").cpus().length;
  return await util.promisify(fsWalk.walk)(
    root,
    Object.assign(
      {
        stats: true,
        concurrency: 4 * cpuCount,
        followSymbolicLinks: false,
        throwErrorOnBrokenSymbolicLink: false,
        errorFilter: (error) => error.code == "ENOENT",
        entryFilter: (entry) => entry.stats.isFile(),
      },
      options || {}
    )
  );
}

async function fetchGameListByPage(options = {}) {
  options = Object.assign(
    { size: 1000, offset: 0, chinese: true, save: true },
    options || {}
  );
  if (!options.id) {
    throw new Error("game list id is required!");
  }
  const variables = {
    id: options.id,
    pageArgs: { size: options.size, offset: options.offset },
    sortBy: { name: "productReleaseDate", isAscending: true },
    filterBy: [
      "storeDisplayClassification:FULL_GAME",
      "storeDisplayClassification:GAME_BUNDLE",
      "storeDisplayClassification:PREMIUM_EDITION",
      "storeDisplayClassification:BUNDLE",
    ],
    facetOptions: [],
  };
  const extensions = {
    persistedQuery: {
      version: 1,
      sha256Hash:
        "9845afc0dbaab4965f6563fffc703f588c8e76792000e8610843b8d3ee9c4c09",
    },
  };
  const url = new URL("https://web.np.playstation.com/api/graphql/v1//op");
  console.log("fetchGameListByPage req:", JSON.stringify(options));
  const params = new URLSearchParams();
  params.append("operationName", "categoryGridRetrieve");
  params.append("variables", JSON.stringify(variables));
  params.append("extensions", JSON.stringify(extensions));
  url.search = params.toString();
  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "accept-language": options.chinese
          ? "zh-CN,zh;q=0.9"
          : "en-HK,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-psn-app-ver":
          "@sie-ppr-web-store/app/0.1.0-20210723171004-hotfix-2-ge2d47c3a-e2d47c3a1f269c51d4614d23e243115cb295dd23",
        "x-psn-correlation-id": "22604d19-45ca-41a1-ba83-e477d1856aac",
        "x-psn-request-id": "898266c3-a3f1-4419-9306-3192a571d2e3",
        "x-psn-store-locale-override": options.chinese ? "zh-Hans-HK" : "en-HK",
      },
      referrer: "https://store.playstation.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    });
    console.log("fetchGameListByPage res:", res.status, res.statusText);
    const json = await res.json();
    if (res.ok) {
      console.log(
        "fetchGameListByPage ok:",
        JSON.stringify(json.data.categoryGridRetrieve.pageInfo)
      );
      const size = variables.pageArgs.size;
      const offset = variables.pageArgs.offset;
      const jsondir = path.join("data", "store");
      if (!(await fs.pathExists(jsondir))) {
        await fs.mkdirp(jsondir);
      }
      const filename = `list-${options.id}-${
        options.chinese ? "cn" : "en"
      }-${offset}-${size}.json`;
      const jsonFile = path.join(jsondir, filename);
      options.save &&
        (await fs.writeJSON(jsonFile, json, {
          spaces: 2,
        }));
      return json;
    } else {
      console.log("fetchGameListByPage failed:", json);
    }
  } catch (error) {
    console.error("fetchGameListByPage error:", error);
  }
}

const LIST_ID_PS4 = "5f3aa730-1c8e-4a18-84da-030bb91558c0";
const LIST_ID_PS5 = "d71e8e6d-0940-4e03-bd02-404fc7d31a31";

async function fetchGameListAll(id, name) {
  if (!id || !name) {
    throw new Error("id and name are required!");
  }
  console.log("fetchOneSale", id, name);
  const size = 1000;
  let cnp = [];
  let enp = [];
  for (let offset = 0; offset < 5000; offset += size) {
    let res = await fetchGameListByPage({
      size: size,
      offset: offset,
      id: id,
      name: name + "-cn",
      chinese: true,
    });
    cnp.push(res.data.categoryGridRetrieve.products);
    await sleep(3000);
    res = await fetchGameListByPage({
      size: size,
      offset: offset,
      id: id,
      name: name + "-en",
      chinese: false,
    });
    enp.push(res.data.categoryGridRetrieve.products);
    await sleep(3000);
    const page = res && res.data.categoryGridRetrieve.pageInfo;
    if (!page || page.isLast) {
      break;
    }
  }
  cnp = cnp.flat();
  enp = enp.flat();
  return { cnp, enp };
}

async function fetchPS4() {
  return await fetchGameListAll(LIST_ID_PS4, "ps4-all");
}

async function fetchPS5() {
  return await fetchGameListAll(LIST_ID_PS5, "ps5-all");
}

async function readList(files) {
  showFor(files);
  let products = [];
  for (const f of files) {
    let j = await fs.readJSON(f);
    j = j.data.categoryGridRetrieve;
    // console.log("loadList push", f, j.pageInfo.offset);
    products.push(j.products);
  }
  products = products.flat();
  console.log("readList result", files.length, products.length);
  return products;
}

async function readAll(pathMatch) {
  console.log("readAll for", pathMatch);
  let files = await walk("./data/store/");
  files = files.filter((f) => f.name.includes(pathMatch)).map((f) => f.path);
  console.log("readAll", pathMatch, files.length);
  return await readList(files);
}

async function fetchAll() {
  await fetchPS4();
  await fetchPS5();
}

function convertMedia(p) {
  let a, b, c, d;
  for (m of p.media) {
    if (m.role === "MASTER") {
      a = m.url;
    } else if (m.role === "BACKGROUND") {
      d = m.url;
    } else if (m.role === "GAMEHUB_COVER_ART") {
      c = m.url;
    } else if (m.role === "EDITION_KEY_ART") {
      b = m.url;
    }
  }
  return a || b || c || d;
}

function mergeOneGame(p, p2) {
  const fullNameCn = p.name.trim();
  const fullNameEn = (p2 && p2.name.trim()) || fullNameCn;
  return Object.assign(p, {
    fullNameCn: fullNameCn,
    nameCn: fullNameCn.split("(")[0].trim(),
    fullNameEn: fullNameEn,
    nameEn: fullNameEn.split("(")[0].trim(),
    cover: convertMedia(p),
    productEn: p2,
  });
}

async function mergeGames(cnp, enp) {
  console.log("mergeGames", cnp.length, enp.length);
  let enMap = new Map(enp.map((it) => [it.id, it]));
  return cnp.map((p) => mergeOneGame(p, enMap.get(p.id)));
}

function getAllDBFile() {
  return `./data/store/store-games-${getMonth()}.db`;
}

function getAllJsonFile() {
  return `./data/store/store-games-${getMonth()}.json`;
}

async function storeAll() {
  // parse all json and store to sqlite db
  // cn and en names are merged
  // read cn game list json
  let ps4cn = await readAll(LIST_ID_PS4 + "-cn");
  let ps4en = await readAll(LIST_ID_PS4 + "-en");
  let ps5cn = await readAll(LIST_ID_PS5 + "-cn");
  let ps5en = await readAll(LIST_ID_PS5 + "-en");
  const ps4merged = await mergeGames(ps4cn, ps4en);
  const ps5merged = await mergeGames(ps5cn, ps5en);
  const allGames = _.concat(ps4merged, ps5merged);
  const products = _.uniqBy(allGames, (it) => it.id);
  console.log("storeAll ps4:", ps4cn.length, ps4en.length, ps4merged.length);
  console.log("storeAll ps5:", ps5cn.length, ps5en.length, ps5merged.length);
  console.log("storeAll all:", products.length, products.length);
  if (products && products.length > 0) {
    await fs.writeJSON(getAllJsonFile(), products, {
      spaces: 2,
    });
    console.log(products.length);
    const db = await createDB(getAllDBFile(), true);
    await db.bulkInsert(products);
    // showFor(products, 2);
  } else {
    console.log("storeAll nothing to do.");
  }
}

async function loadAll() {
  const db = await createDB(getAllDBFile(), true);
  const products = await db.queryAll();
  // showFor(products, 5, ["id", "name"]);
  return products;
}

async function fetchSales() {
  // https://store.playstation.com/zh-hans-hk/category/976c3cf7-8dc9-46fb-8691-4603b98224cb/1
  const sale1 = {
    id: "976c3cf7-8dc9-46fb-8691-4603b98224cb",
    name: "playstation-indies",
  };
  //https://store.playstation.com/zh-hans-hk/category/f29434d5-b236-4d6d-a202-0fcdfb0a13e8/1
  const sale2 = {
    id: "f29434d5-b236-4d6d-a202-0fcdfb0a13e8",
    name: "under-148hk",
  };
  const list1 = await fetchGameListAll(sale1.id, sale1.name);
  const list2 = await fetchGameListAll(sale2.id, sale2.name);
  return list1.concat(list2);
}

function getSaleDBFile() {
  return `./data/store/sale-games-${getMonth()}.db`;
}

function getSaleJsonFile() {
  return `./data/store/sale-games-${getMonth()}.json`;
}

async function storeSales() {
  const sale1 = {
    id: "976c3cf7-8dc9-46fb-8691-4603b98224cb",
    name: "playstation-indies",
  };
  const sale2 = {
    id: "f29434d5-b236-4d6d-a202-0fcdfb0a13e8",
    name: "under-148hk",
  };
  const cn1 = await readAll(sale1.id + "-cn");
  const en1 = await readAll(sale1.id + "-en");
  const cn2 = await readAll(sale2.id + "-cn");
  const en2 = await readAll(sale2.id + "-en");

  let cnp = _.concat(cn1, cn2);
  let enp = _.concat(en1, en2);
  const allGames = await mergeGames(cnp, enp);
  const products = _.uniqBy(allGames, (it) => it.id);
  console.log(
    "storeSales",
    cnp.length,
    enp.length,
    allGames.length,
    products.length
  );
  if (products && products.length > 0) {
    await fs.writeJSON(getSaleJsonFile(), products, {
      spaces: 2,
    });
    console.log(products.length);
    const db = await createDB(getSaleDBFile(), true);
    await db.bulkInsert(products);
    // showFor(products, 2);
  } else {
    console.log("storeSales nothing to do.");
  }
}

async function loadSales() {
  const db = await createDB(getSaleDBFile(), true);
  const products = await db.queryAll();
  // showFor(products, 5, ["id", "name"]);
  return products;
}

module.exports = {
  fetchAll,
  storeAll,
  loadAll,
  fetchSales,
  storeSales,
  loadSales,
};

async function main() {
  await storeAll();
  await loadAll();
  console.log("--------------------");
  await storeSales();
  await loadSales();
}

if (require.main.filename === __filename) {
  console.log("module loaded:", __filename);
  main();
}
