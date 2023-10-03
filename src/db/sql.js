const fetchServicTestRunnerData = "SELECT * FROM `service_test_runner_data` WHERE next_run_at <= ? AND test_status = ?";
const updateLastRunTime = "UPDATE `service_test_runner_data` SET `last_run_at`= ? WHERE `id` IN (?)";
const updateNextRunTime = "UPDATE `service_test_runner_data` SET `next_run_at`= ? WHERE `id` = ?";

module.exports = {
    fetchServicTestRunnerData,
    updateLastRunTime,
    updateNextRunTime,
};
