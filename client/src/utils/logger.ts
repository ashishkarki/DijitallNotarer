import log from "loglevel";

const isProd = process.env.NODE_ENV !== "production";

// Set logLevel based on the environment
if (isProd) {
  log.setLevel("error"); // only log errors in production
} else {
  log.setDefaultLevel("info");
}

export default log;
