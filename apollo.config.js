module.exports = {
  client: {
    service: {
      name: "fitfam",
      url: "http://localhost:3000/api/graphql",
      localSchemaFile: "api/src/generated/schema.graphql"
    },
    includes: ["www/pages/**/*.{ts,tsx,js,jsx,graphql}"]
  }
};
