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

const fs = require("fs-extra");
const { URL, URLSearchParams } = require("url");
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

const proxy = process.env.http_proxy || "http://127.0.0.1:2081";
const agent = new HttpsProxyAgent(proxy);

const UA_VALUE =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36";

const STORE_PS4_GAMES_LIST =
  "https://store.playstation.com/zh-hans-hk/category/5f3aa730-1c8e-4a18-84da-030bb91558c0/1";
const STORE_PS5_GAMES_LIST =
  "https://store.playstation.com/zh-hans-hk/category/d71e8e6d-0940-4e03-bd02-404fc7d31a31/1";

async function fetchGameListByPage(size = 400, offset = 0, PS5 = false) {
  // date: 20210818
  // ps4 "totalCount": 3357
  // ps5 "totalCount": 341
  const id4 = "5f3aa730-1c8e-4a18-84da-030bb91558c0";
  const id5 = "d71e8e6d-0940-4e03-bd02-404fc7d31a31";
  const variables = {
    id: PS5 ? id5 : id4,
    pageArgs: { size: size, offset: offset },
    sortBy: { name: "productReleaseDate", isAscending: false },
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
  console.log("fetchGameListByPage req:", url, variables, extensions);
  const params = new URLSearchParams();
  params.append("operationName", "categoryGridRetrieve");
  params.append("variables", JSON.stringify(variables));
  params.append("extensions", JSON.stringify(extensions));
  url.search = params.toString();

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "accept-language": "zh-CN,zh;q=0.9",
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
        "x-psn-store-locale-override": "zh-Hans-HK",
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
      const jsonFile = `./data/store-game-list-ps${
        PS5 ? 5 : 4
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

async function fetchAll() {
  const size = 400;
  // ps4 games
  //   for (let offset = 0; offset < 4000; offset += 400) {
  //     console.log(size, offset);
  //     const page = await fetchGameListByPage(size, offset);
  //     if (!page || page.isLast) {
  //       break;
  //     }
  //   }
  // ps5 games
  //   for (let offset = 0; offset < 4000; offset += 400) {
  //     console.log(size, offset);
  //     const page = await fetchGameListByPage(size, offset, true);
  //     if (!page || page.isLast) {
  //       break;
  //     }
  //   }
}

module.exports = { fetchAll };
