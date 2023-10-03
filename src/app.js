const express = require("express");
const app = express();
const cron = require("node-cron");
const { callpreprocessorServiceCron } = require("./cron/callpreprocessorServiceCron.js");
const { MONITOR_MINDER_CRON } = require("./constants/cron.js");
require("dotenv").config();

app.use(express.json());

cron.schedule(MONITOR_MINDER_CRON, callpreprocessorServiceCron);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
