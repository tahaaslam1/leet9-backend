module.exports = () => {
  const dbStatus = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const logStatus = (connection) => {
    console.log("************************************");
    console.log(dbStatus[connection]);
  };

  return {
    logStatus,
  };
};
