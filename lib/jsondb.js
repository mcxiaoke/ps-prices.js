const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const fs = require("fs-extra");
const path = require("path");

class JsonDatabase {
  constructor(filename, debug = false) {
    this.dbFile = filename;
    this.debug = debug;
    this.debug && console.log("JsonDatabase()", filename, debug);
  }

  _log() {
    this.debug && console.log.apply(console, arguments);
  }

  async _createTable(db) {
    await db.exec(
      `CREATE TABLE IF NOT EXISTS data (
          key TEXT NOT NULL PRIMARY KEY,
          size INTEGER, 
          value TEXT,
          UNIQUE(key)
        );`
    );
    return db;
  }

  async _open(init = false) {
    this._log("open", init);
    const fileDir = path.dirname(this.dbFile);
    if (!(await fs.pathExists(fileDir))) {
      await fs.mkdirs(fileDir);
    }
    this.debug && sqlite3.verbose();
    const db = await sqlite.open({
      filename: this.dbFile,
      driver: sqlite3.Database,
    });
    init && (await this._createTable(db));
    return db;
  }

  async _insert(db, obj) {
    if (!(db && obj)) {
      throw new Error("Database and file object is required!");
    }
    let key, value;
    if (Array.isArray(obj) && obj.length == 2) {
      [key, value] = obj;
    } else if (typeof obj === "object") {
      if (["key", "value"].every((it) => Object.keys(obj).includes(it))) {
        key = obj["key"];
        value = obj["value"];
      } else {
        key = obj["key"] || obj["id"] || obj["name"];
        value = obj;
      }
    } else {
      throw new Error("Object must has key and value!");
    }
    value = JSON.stringify(value);
    return await db.run(
      `INSERT OR REPLACE INTO data (key,value,size) VALUES (?,?,?)`,
      key,
      value,
      value.length
    );
  }

  async _query(db, sql) {
    if (!(db && sql)) {
      throw new Error("Database and sql is required!");
    }
    return await db.all(sql);
  }

  async insert(obj) {
    const db = await this._open();
    const result = await this._insert(db, obj);
    await db.close();
    return result;
  }

  async bulkInsert(objArr, verbose = false) {
    const results = [];
    const db = await this._open();
    db.run("BEGIN");
    let i = 0;
    try {
      for (const obj of objArr) {
        i++;
        const ret = await this._insert(db, obj);
        results.push(ret);
        verbose && this._log("bulkInsert", i, `row-${ret.lastID} added`);
      }
    } catch (error) {
      db.run("ROLLBACK");
      console.error("bulkInsert", error);
    }
    db.run("COMMIT");
    if (this.debug) {
      const countRet = await db.get(`SELECT count(key) from data`);
      const count = countRet["count(key)"];
      this._log("bulkInsert", `Insert ${count} rows to db`);
    }
    await db.close();
    return results;
  }

  async query(key) {
    if (!key) {
      throw new Error("key is required!");
    }
    const db = await this._open();
    try {
      const row = await db.get(`SELECT * from data where key = ?`, key);
      return row && row.value && JSON.parse(row.value);
    } catch (error) {
      console.error("query", error);
    }
    await db.close();
  }

  async queryAll(options) {
    options = Object.assign(
      { limit: -1, offset: 0, verbose: false, filterFn: Boolean },
      options || {}
    );
    const db = await this._open();
    if (this.debug) {
      const countRet = await db.get(`SELECT count(key) from data`);
      const count = countRet["count(key)"];
      console.log("queryAll", `total ${count} rows in db`, options);
    }
    const rows = await db.all(
      `SELECT * FROM data ORDER BY rowid LIMIT ${options.limit} OFFSET ${options.offset}`
    );
    let result = await Promise.all(
      rows.map(async (row, i) => {
        try {
          options.verbose && this._log("queryAll", "read", i, row.key);
          return JSON.parse(row.value);
        } catch (error) {
          console.error("queryAll", error);
        }
      })
    );
    result = result.filter(options.filterFn);
    await db.close();
    this._log("queryAll", `return ${result.length} rows from db`);
    return result;
  }
}

async function createDB(filename, debug) {
  const jsondb = new JsonDatabase(filename, debug);
  await jsondb._open(true);
  return jsondb;
}

// const db = await require("./db")("./data/data.db", true);
module.exports = { createDB };
