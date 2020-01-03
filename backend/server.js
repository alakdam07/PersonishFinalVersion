const express = require("express");
const app = express();
const port = 5000;
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors"); //this package will allow orgin

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true
  })
);

app.listen(port, () =>
  console.log(`✅  Example app listening on port ${port}!`)
);
