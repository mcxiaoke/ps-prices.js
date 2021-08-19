/***
 * 
 
// has filter

curl 'https://web.np.playstation.com/api/graphql/v1//op?operationName=categoryGridRetrieve&variables=%7B%22id%22%3A%225f3aa730-1c8e-4a18-84da-030bb91558c0%22%2C%22pageArgs%22%3A%7B%22size%22%3A24%2C%22offset%22%3A0%7D%2C%22sortBy%22%3A%7B%22name%22%3A%22productReleaseDate%22%2C%22isAscending%22%3Afalse%7D%2C%22filterBy%22%3A%5B%22storeDisplayClassification%3AFULL_GAME%22%2C%22storeDisplayClassification%3AGAME_BUNDLE%22%2C%22storeDisplayClassification%3APREMIUM_EDITION%22%2C%22storeDisplayClassification%3ABUNDLE%22%5D%2C%22facetOptions%22%3A%5B%5D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%229845afc0dbaab4965f6563fffc703f588c8e76792000e8610843b8d3ee9c4c09%22%7D%7D' \
  -H 'authority: web.np.playstation.com' \
  -H 'sec-ch-ua: "Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"' \
  -H 'dnt: 1' \
  -H 'x-psn-request-id: 898266c3-a3f1-4419-9306-3192a571d2e3' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'accept: application/json' \
  -H 'x-psn-app-ver: @sie-ppr-web-store/app/0.1.0-20210723171004-hotfix-2-ge2d47c3a-e2d47c3a1f269c51d4614d23e243115cb295dd23' \
  -H 'x-psn-correlation-id: 22604d19-45ca-41a1-ba83-e477d1856aac' \
  -H 'x-psn-store-locale-override: zh-Hans-HK' \
  -H 'origin: https://store.playstation.com' \
  -H 'sec-fetch-site: same-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://store.playstation.com/' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  --compressed

fetch("https://web.np.playstation.com/api/graphql/v1//op?operationName=categoryGridRetrieve&variables=%7B%22id%22%3A%225f3aa730-1c8e-4a18-84da-030bb91558c0%22%2C%22pageArgs%22%3A%7B%22size%22%3A24%2C%22offset%22%3A0%7D%2C%22sortBy%22%3A%7B%22name%22%3A%22productReleaseDate%22%2C%22isAscending%22%3Afalse%7D%2C%22filterBy%22%3A%5B%22storeDisplayClassification%3AFULL_GAME%22%2C%22storeDisplayClassification%3AGAME_BUNDLE%22%2C%22storeDisplayClassification%3APREMIUM_EDITION%22%2C%22storeDisplayClassification%3ABUNDLE%22%5D%2C%22facetOptions%22%3A%5B%5D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%229845afc0dbaab4965f6563fffc703f588c8e76792000e8610843b8d3ee9c4c09%22%7D%7D", {
  "headers": {
    "accept": "application/json",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-psn-app-ver": "@sie-ppr-web-store/app/0.1.0-20210723171004-hotfix-2-ge2d47c3a-e2d47c3a1f269c51d4614d23e243115cb295dd23",
    "x-psn-correlation-id": "22604d19-45ca-41a1-ba83-e477d1856aac",
    "x-psn-request-id": "898266c3-a3f1-4419-9306-3192a571d2e3",
    "x-psn-store-locale-override": "zh-Hans-HK"
  },
  "referrer": "https://store.playstation.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
});

URLSearchParams {
  'https://web.np.playstation.com/api/graphql/v1//op?operationName' => 'categoryGridRetrieve',
  'variables' => '{"id":"5f3aa730-1c8e-4a18-84da-030bb91558c0","pageArgs":{"size":24,"offset":0},"sortBy":{"name":"productReleaseDate","isAscending":false},"filterBy":["storeDisplayClassification:FULL_GAME","storeDisplayClassification:GAME_BUNDLE","storeDisplayClassification:PREMIUM_EDITION","storeDisplayClassification:BUNDLE"],"facetOptions":[]}',
  'extensions' => '{"persistedQuery":{"version":1,"sha256Hash":"9845afc0dbaab4965f6563fffc703f588c8e76792000e8610843b8d3ee9c4c09"}}' }


'/api/graphql/v1//op?operationName=categoryGridRetrieve&variables={"id":"5f3aa730-1c8e-4a18-84da-030bb91558c0","pageArgs":{"size":24,"offset":0},"sortBy":{"name":"productReleaseDate","isAscending":false},"filterBy":["storeDisplayClassification:FULL_GAME","storeDisplayClassification:GAME_BUNDLE","storeDisplayClassification:PREMIUM_EDITION","storeDisplayClassification:BUNDLE"],"facetOptions":[]}&extensions={"persistedQuery":{"version":1,"sha256Hash":"9845afc0dbaab4965f6563fffc703f588c8e76792000e8610843b8d3ee9c4c09"}}'

  
 * 
 */

const util = require("util");
const fsWalk = require("@nodelib/fs.walk");
const fs = require("fs-extra");
const { URL, URLSearchParams } = require("url");
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");
const path = require("path");
const { showFor } = require("./misc");
const { listenerCount } = require("events");

const proxy = process.env.http_proxy || "http://127.0.0.1:2081";
const agent = new HttpsProxyAgent(proxy);

const UA_VALUE =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36";

const STORE_PS4_GAMES_LIST =
  "https://store.playstation.com/zh-hans-hk/category/5f3aa730-1c8e-4a18-84da-030bb91558c0/1";
const STORE_PS5_GAMES_LIST =
  "https://store.playstation.com/zh-hans-hk/category/d71e8e6d-0940-4e03-bd02-404fc7d31a31/1";

async function fetchGameListByPage(options = {}) {
  options = Object.assign(
    { size: 400, offset: 0, ps5: false, chinese: true },
    options || {}
  );
  // date: 20210818
  // ps4 "totalCount": 3357
  // ps5 "totalCount": 341
  const id4 = "5f3aa730-1c8e-4a18-84da-030bb91558c0";
  const id5 = "d71e8e6d-0940-4e03-bd02-404fc7d31a31";
  const variables = {
    id: options.ps5 ? id5 : id4,
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
  console.log("fetchGameListByPage req:", options, variables);
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
        json.data.categoryGridRetrieve.pageInfo
      );
      const size = variables.pageArgs.size;
      const offset = variables.pageArgs.offset;
      const jsonFile = `./data/store-list-${options.ps5 ? "ps5" : "ps4"}-${
        options.chinese ? "cn" : "en"
      }-${offset}-${size}.json`;
      await fs.writeJSON(jsonFile, json, {
        spaces: 2,
      });
      return json.data.categoryGridRetrieve.pageInfo;
    } else {
      console.log("fetchGameListByPage failed:", json);
    }
  } catch (error) {
    console.error("fetchGameListByPage error:", error);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAll() {
  // await fetchGameListByPage({ size: 5, offset: 0, ps5: false, chinese: false });
  // await fetchGameListByPage({ size: 5, offset: 0, ps5: false, chinese: true });
  const size = 400;
  // PS4
  for (let offset = 0; offset < 4000; offset += 400) {
    console.log(size, offset);
    let page = await fetchGameListByPage({
      size: size,
      offset: offset,
      ps5: false,
      chinese: true,
    });
    await sleep(3000);
    page = await fetchGameListByPage({
      size: size,
      offset: offset,
      ps5: false,
      chinese: false,
    });
    await sleep(3000);
    if (!page || page.isLast) {
      break;
    }
  }
  // PS5
  for (let offset = 0; offset < 4000; offset += 400) {
    console.log(size, offset);
    let page = await fetchGameListByPage({
      size: size,
      offset: offset,
      ps5: true,
      chinese: true,
    });
    await sleep(3000);
    page = await fetchGameListByPage({
      size: size,
      offset: offset,
      ps5: true,
      chinese: false,
    });
    await sleep(3000);
    if (!page || page.isLast) {
      break;
    }
  }
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

async function readList(pathMatch) {
  console.log("====================");
  console.log("read list for", pathMatch);
  let files = await walk("data");
  files = files.filter((f) => f.name.includes(pathMatch)).map((f) => f.path);
  showFor(files);
  let result = [];
  for (const f of files) {
    let j = await fs.readJSON(f);
    j = j.data.categoryGridRetrieve;
    // console.log(j.pageInfo);
    console.log(
      "read list push",
      j.pageInfo.offset,
      j.pageInfo.size,
      j.pageInfo.isLast
    );
    result.push(j.products);
  }
  result = result.flat();
  console.log("read list result", result.length);
  return result;
}

async function storeAll() {
  // parse all json and store to sqlite db
  // cn and en names are merged
  // read cn game list json
  const products = [];
  let cnp = await readList("-cn-");
  let enp = await readList("-en-");
  let enMap = new Map(enp.map((it) => [it.id, it]));
  for (const p of cnp) {
    const p2 = enMap.get(p.id);
    const product = {
      pid: p.id,
      tid: p.npTitleId,
      name: p.name,
      name_en: (p2 && p2.name) || p.name,
      type: p.__typename,
      class: p.localizedStoreDisplayClassification,
      sku: p.skus[0] && p.skus[0].type,
      platforms: p.platforms.join("|"),
      price: (p.price && p.price.basePrice) || 0,
      raw: { cn: JSON.stringify(p), en: JSON.stringify(p2) },
    };
    for (m of p.media) {
      if (m.role === "MASTER") {
        product.img_master = m.url;
      } else if (m.role === "LOGO") {
        product.img_logo = m.url;
      } else if (m.role === "BACKGROUND") {
        product.img_bg = m.url;
      } else if (m.role === "GAMEHUB_COVER_ART") {
        product.img_cover = m.url;
      } else if (m.role === "EDITION_KEY_ART") {
        product.img_art = m.url;
      }
    }
    product.img_master = product.img_master || "";
    product.img_logo = product.img_logo || "";
    product.img_bg = product.img_bg || "";
    product.img_art = product.img_art || "";
    products.push(product);
  }
  await fs.writeJSON("./data/psn_games.json", products, { spaces: 2 });
  console.log(products.length);
  let count = 20;
  const { dbBulkInsert } = require("./db");
  await dbBulkInsert(products);
  // showFor(products, 5);
}

async function loadAll() {
  const { dbBulkRead } = require("./db");
  const products = await dbBulkRead();
  showFor(products, 5);
}

module.exports = { fetchAll, storeAll };

loadAll();
