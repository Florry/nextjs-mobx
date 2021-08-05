const express = require("express");
const users = require("./data/users.json");
const products = require("./data/products.json");

const app = express();

app.listen(4000);

console.log("Example server running on port 4000");

app.get("/user", (_req, res) => res.json({ users }));
app.get("/product", (_req, res) => res.json({ products }));
