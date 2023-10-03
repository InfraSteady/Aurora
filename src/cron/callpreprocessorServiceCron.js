const axios = require("axios");
const { getConnection } = require("../db/connection.js");

const { fetchServicTestRunnerData, updateLastRunTime, updateNextRunTime } = require("../db/sql.js");

const callpreprocessorServiceCron = async () => {
    const connection = await getConnection();
    let timestamp = Math.floor(Date.now() / 1000);
    const [rows] = await connection.query(fetchServicTestRunnerData, [timestamp, 1]);
    const AllserviceTestID = rows.map((row) => row.id);
    await connection.query(updateLastRunTime, [timestamp, AllserviceTestID]);
    //console.log(rows);
    //console.log("size : ", rows.length);
    for (const row of rows) {
        let nextRunTime = Math.floor(Date.now() / 1000) + row.interval;
        await connection.query(updateNextRunTime, [nextRunTime, row.id]);
        //console.log("row : ", row);
        let data = JSON.stringify(row);
        let url = `${process.env.PREPROCESSOR_SERVICE_URL}`;
        let config = {
            method: "post",
            url,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        axios(config)
            .then(async (response) => {
                console.log("inside row ", row);
                console.log("Success", response.data.data);
            })

            .catch(async (e) => {
                console.log("Failure", e);
            });
    }
};

module.exports = { callpreprocessorServiceCron };
