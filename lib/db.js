const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const fs = require("fs-extra");
const path = require("path");
const tableName = "psn_games";

async function dbCreateTable(db) {
  // https://www.npmjs.com/package/sqlite
  await db.exec(
    `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER AUTO INCREMENT,
        pid TEXT NOT NULL,
        name TEXT NOT NULL, 
        data TEXT NOT NULL,
        UNIQUE(pid),
        PRIMARY KEY(pid)
      );`
  );
  return db;
}

async function dbOpenDatabase(filename = `./data/${tableName}.db`) {
  //   if (await fs.pathExists(filename)) {
  //     await fs.rm(filename);
  //   }
  console.log("dbOpenDatabase", filename);
  const fileDir = path.dirname(filename);
  if (!(await fs.pathExists(fileDir))) {
    await fs.mkdirs(fileDir);
  }
  sqlite3.verbose();
  const db = await sqlite.open({
    filename: filename,
    driver: sqlite3.Database,
  });
  await dbCreateTable(db);
  return db;
}

function objToValue(arr) {
  return arr.map((v) => {
    if (typeof v === "object") {
      return JSON.stringify(v);
    } else {
      return v;
    }
  });
}

// async function dbInsertRow(db, obj) {
//   if (!(db && obj)) {
//     throw new Error("Database and file object is required!");
//   }
//   const cols = Object.keys(obj).join(",");
//   const placeholders = Object.keys(obj).fill("?").join(", ");
//   const values = objToValue(Object.values(obj));
//   //   console.log(`dbInsertRow ${tableName} (${cols})`);
//   const ret = await db.run(
//     `INSERT OR REPLACE INTO ${tableName} (${cols}) VALUES (${placeholders})`,
//     ...values
//   );

//   return ret;
// }

async function dbInsertRow(db, obj) {
  if (!(db && obj)) {
    throw new Error("Database and file object is required!");
  }
  const ret = await db.run(
    `INSERT OR REPLACE INTO ${tableName} (pid,name,data) VALUES (?,?,?)`,
    obj.pid,
    obj.name,
    JSON.stringify(obj)
  );

  return ret;
}

async function dbBulkInsert(objArr, debug = false) {
  const results = [];
  const db = await dbOpenDatabase();
  db.run("BEGIN");
  let i = 0;
  try {
    for (const obj of objArr) {
      i++;
      if (obj && obj.raw) {
        const ret = await dbInsertRow(db, obj);
        results.push(ret);
        debug &&
          console.log(
            "dbBulkInsert",
            i,
            `row-${ret.lastID} added ${obj.name} ${obj.pid}`
          );
      } else {
        debug &&
          console.log("dbBulkInsert", i, `skip invalid ${obj.name} ${obj.pid}`);
      }
    }
  } catch (error) {
    db.run("ROLLBACK");
    console.error("dbBulkInsert", error);
  }
  db.run("COMMIT");
  const countRet = await db.get(`SELECT count(pid) from ${tableName}`);
  const count = countRet["count(pid)"];
  await db.close();
  console.log("dbBulkInsert", `Insert ${count} rows to db`);
  return results;
}

async function dbBulkRead(debug = false) {
  const db = await dbOpenDatabase();
  const countRet = await db.get(`SELECT count(pid) from ${tableName}`);
  const count = countRet["count(pid)"];
  console.log("dbBulkRead", `Found ${count} rows in db`);
  const rows = await db.all(`SELECT * FROM ${tableName}`);
  const files = await Promise.all(
    rows.map(async (row, i) => {
      try {
        debug && console.log("dbBulkRead", "read", i, row.name, row.pid);
        return JSON.parse(row.data);
      } catch (error) {
        console.error("dbBulkRead", error);
      }
    })
  );
  await db.close();
  console.log("dbBulkRead", `Read ${rows.length} rows from db`);
  return files;
}

module.exports = { dbBulkInsert, dbBulkRead };
