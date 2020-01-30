var fastify = require("fastify");
var { Client } = require("pg");

const server = fastify({ logger: true });
const client = new Client({
  connectionString: process.env.secureString
});

server.get("/", async (request, reply) => {
  const result = await client.query("SELECT *FROM todo");
  reply.send(result.rows);
});

server.get("/like", async (request, reply) => {
  const result = await client.query("SELECT *FROM todo WHERE text LIKE 'b%'");
  reply.send(result.rows);
});

server.get("/order", async (request, reply) => {
  const result = await client.query("SELECT *FROM todo ORDER BY text DESC");
  reply.send(result.rows);
});

server.post("/", async (request, reply) => {
  const sql = "INSERT INTO todo (text) VALUES ($1)";
  const values = [request.body.text];
  const result = await client.query(sql, values);
  //   const result = await client.query(
  // );
  reply.send(result);
});

server.delete("/:id", async (request, reply) => {
  // const sql = "DELETE FROM todo WHERE id=$id";
  // const values = [request.body.text];
  // console.log($id);
  const result = await client.query(
    `DELETE FROM todo WHERE id = ${request.params.id}`
  );
  reply.send(result);
});

server.put("/", async (request, reply) => {
  const result = await client.query(
    `UPDATE todo SET text = 'hello' WHERE id = ${request.params.id}`
  );
  reply.send(result);
});

server.listen(8080);
client.connect();
