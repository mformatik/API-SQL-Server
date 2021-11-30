const express = require("express");
const app = express();
const port = process.env.PORT || 5002;
const { check, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const sql = require("mssql");
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  "/getDatabases",
  [
    check("ip", "ip is required").not().isEmpty(),
    check("username", "username is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const query = "SELECT name FROM sys.databases WHERE name LIKE 'Hisba_%';";
      const ip = req.body.ip;
      const username = req.body.username;
      const password = req.body.password;
      const database = "master";
      const sql = require("mssql");
      var config = {
        user: username,
        password: password,
        server: ip,
        database: database,
        options: {
          encrypt: false,
          enableArithAbort: true,
          cryptoCredentialsDetails: {
            minVersion: "TLSv1",
          },
        },
        synchronize: true,
      };

      const pool = new sql.ConnectionPool(config);
      try {
        await pool.connect();
        const request = pool.request();
        let result = await request.query(`${query}`);

        return res.json(result.recordset);
      } catch (error) {
        console.error(error);
        const l0 = fs.appendFileSync("./log/test.txt", "\r\n")
        const l1 = fs.appendFileSync("./log/test.txt", "---------------------------------------------------------------------------------\r\n");
        const l2 = fs.appendFileSync("./log/test.txt", `Route  : /getDatabases\r\n`);
        const l3 = fs.appendFileSync("./log/test.txt", `ip : ${ip}\r\n`);
        const l4 = fs.appendFileSync("./log/test.txt", `database : ${database}\r\n`);
        const l5 = fs.appendFileSync("./log/test.txt", `query : ${query}\r\n`);
        const l6 = fs.appendFileSync("./log/test.txt", `Time  : ${Date().toLocaleString()}\r\n`);
        const l7 = fs.appendFileSync("./log/test.txt", `Exception : ${error}\r\n`);
        const l8 = fs.appendFileSync("./log/test.txt", "---------------------------------------------------------------------------------\r\n");
        throw new Error(error);
      } finally {
        pool.close(); // closing connection after request is finished
      }
    } catch (error) {
      console.error("error");
      console.error(error.message);
      return res.status(500).json({ msg: "Error" });
    }
  }
);


app.post(
  "/getQuery",
  [
    check("ip", "ip is required").not().isEmpty(),
    check("username", "username is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    check("database", "database is required").not().isEmpty(),
    check("query", "query is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const query = req.body.query;
      const ip = req.body.ip;
      const username = req.body.username;
      const password = req.body.password;
      const database = req.body.database;

      var config = {
        user: username,
        password: password,
        server: ip,
        database: database,
        options: {
          encrypt: false,
          enableArithAbort: true,
          cryptoCredentialsDetails: {
            minVersion: "TLSv1",
          },
        },
        synchronize: true,
      };

      const pool = new sql.ConnectionPool(config);
      try {
        await pool.connect();
        const request = pool.request();
        let result = await request.query(`${query}`);

        return res.json(result.recordset);
      } catch (error) {
        console.error(error);
        const l0 = fs.appendFileSync("./log/test.txt", "\r\n")
        const l1 = fs.appendFileSync("./log/test.txt", "---------------------------------------------------------------------------------\r\n");
        const l2 = fs.appendFileSync("./log/test.txt", `Route  : /getQuery\r\n`);
        const l3 = fs.appendFileSync("./log/test.txt", `ip : ${ip}\r\n`);
        const l4 = fs.appendFileSync("./log/test.txt", `database : ${database}\r\n`);
        const l5 = fs.appendFileSync("./log/test.txt", `query : ${query}\r\n`);
        const l6 = fs.appendFileSync("./log/test.txt", `Time  : ${Date().toLocaleString()}\r\n`);
        const l7 = fs.appendFileSync("./log/test.txt", `Exception : ${error}\r\n`);
        const l8 = fs.appendFileSync("./log/test.txt", "---------------------------------------------------------------------------------\r\n");
        throw new Error(error);
      } finally {
        pool.close(); // closing connection after request is finished
      }
    } catch (error) {
      console.error("error");
      console.error(error.message);

      return res.status(500).json({ msg: error.message });
    }
  }
);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
