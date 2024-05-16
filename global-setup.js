module.exports = async () => {
  process.env.TZ = 'America/Sao_Paulo';
  process.env.DISABLE_LOGS = 'true';
  process.env.RUN_COLLECTOR = 'false';
};
