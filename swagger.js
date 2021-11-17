const jsonwebtoken = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const swaggerAutogen = require("swagger-autogen");

const output = "./swaggerOutput.json";

const routes = ["./routes/auth", "./routes/items", "./routes/orders"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Pharma ",
    description: "Pharmacy stock inventory",
  },
  host: "localhost:3001",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Routes",
    },
    // { ... }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      scheme: 'token',
      tokenFormat: jsonwebtoken,
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'x-access-token', // name of the header, query parameter or cookie
      description: 'Some description...'
    },
  },
  definitions: {
    user: {
      user_name: "string",
      password: "any",
      phone: "number",
    },
    userRes: {
      user_name: "string",
      password: "any",
      phone: "number",
      isAdmin: "boolean",
    },
    login: {
      user_name: "string",
      password: "any",
    },
    otherLogin: {
      token: "any",
      isAdmin: "boolean",
    },
    items: {
      name: "string",
      quantity: "Boolean",
      brand: "string",
    },
    orders: {
      items: [
        {
          id: "use -id",
          name: "string",
          brand: "string",
          quantity: "number",
        },
      ],
      customer_phone: "number",
    },
    ordersRes: {
      items: [
        {
          id: "use -id",
          name: "string",
          brand: "string",
          quantity: "number",
        },
      ],
      customer_phone: "number",
      created_at: "date",
      updated_at: "date",
    },
  },
  components: {},
};

swaggerAutogen()(output, routes, doc).then(async () => {
  await import("./index.js");
});
