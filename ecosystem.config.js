module.exports = {
  apps: [
    {
      name: "nekosanq.net",
      script: "next",
      args: "start -p 3000",
      cwd: "/app",
      env: {
        NODE_ENV: "production"
      },
      out_file: "/app/logs/out.log",
      error_file: "/app/logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
