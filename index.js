const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const client = require('./connection');

dotenv.config();


const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

let data;

app.post("/api", (request, response) => {
  console.log("I got a request !");
  console.log(request.body);
  data = request.body;
  response.json({
    status: "success",
    query: data.q,
  });
});
  app.get("/api", (req, res) => {
    client.query(data.q, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  });

  const pool = new pg.Pool();

  app.get('/bureau_topo', async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM bureau_topo")
  
    res.json(rows)
  });

  app.get('/cafe2', async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM bureau_topo")
  
    res.json(rows)
  });
  app.get('/bus', async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM bureau_topo")
  
    res.json(rows)
  });
  app.get('/regions_wgs', async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM bureau_topo")
  
    res.json(rows)
  });
  const PORT = process.env.PORT || 3300;

  app.listen(PORT, console.log('app running'));
