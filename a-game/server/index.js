const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const app = express();
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.get("/api/games/:query", (req, res) => {
  console.log('games query: ', req.params.query);

  axios.get("https://api-endpoint.igdb.com/games/?search=bloodborne&limit=10&fields=id,name,cover,rating&filter[release_dates.platform][eq]=48", {
    headers: {
      "user-key": "e00729895e77a7df82eaf382c0f96980",
      "Accept": "application/json"
    }
  })
  .then(response => res.send(response.data))
  .catch(error => res.status(400).send(error.response.data))
})

app.get("/api/walmart/:query", (req, res) => {
  console.log('walmart query: ', req.params.query);
  axios.get("http://api.walmartlabs.com/v1/search?apiKey=p72x4ztgjufkhbvfg6ymtdbk&query=bloodborne")
  .then(response => res.send(response.data))
  .catch(error => res.status(400).send(error.response))
})

  app.listen(PORT, () => console.log('listening on port ', PORT));