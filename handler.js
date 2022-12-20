import MySQL from "serverless-mysql";

// mysqlモジュールの初期化
// 関数外でモジュールを初期化することで実行間の接続で再利用が可能になる
const mysql = MySQL({
  // backoff: 'decorrelated',
  // base: 5,
  // cap: 200
});

// 接続設定オプションは初期化時でも後でも渡すことができる
// https://github.com/mysqljs/mysql#connection-options
mysql.config({
  host: process.env.MYSQL_ENDPOINT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
});

export const customerIndex = async (event) => {
  const results = await mysql.query("SELECT * FROM customers");

  await mysql.end();

  return results;
};

export const customerCreate = async (event) => {
  const body = JSON.parse(event.body);

  const query = `INSERT INTO customers (name) VALUES ('${body.name || ""}')`;

  const results = await mysql.query(query);

  await mysql.end();

  return results;
};
