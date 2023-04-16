const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
//cors con sus dos endpoint de generar orden de pago y confirmación de pago
const cors = require("cors");
const whiteList = ["*"];
app.use(cors({ origin: whiteList }));

//methodo cors1 separado

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.PROD_ACCESS_TOKEN,
});

app.get("/", (req, res) => {
  res.send("Hello Worldsito");
});

app.use("/payment", (req, res) => {
  let preference = {
    items: [
      {
        id: 1,
        title: "bestial",
        currency_id: "USD",
        description: "oZ",
        category_id: "men",
        unit_price: 100,
        quantity: 1,
      },
    ],

    back_urls: {
      success: "https://6de0-190-237-15-155.sa.ngrok.io/success",
      failure: "",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body.init_point);
      res.send(`<a href="${response.body.init_point}">IR A PAGAR PAPU </a>`);
    })
    .catch((error) => res.status(400).send({ error: error.message }));
});

app.get("/success", (req, res) => {
  res.send("pay successful");
});

//server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running PUTIN on Port ${port}`);
});
