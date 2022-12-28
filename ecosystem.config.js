module.exports = {
  apps: [
    {
      name: "desafio_focus",
      script: "./bin/www",
      watch: ["models", "controllers", "routes"],
      watch_delay: 1000,
      ignore_watch: ["node_modules", "uploads"],
      env_development: {
        NODE_ENV: "development",
        PORT: "3002",
        SALT: "OMeG@C0T3cHN?Fx:C",
        DB_USER: "Marcus",
        DB_PASSWORD: "rEfMCibhsFWEp5pd",
        IMAGE_PATH: "http://localhost:3002/api",
      }
    },
  ],
};
