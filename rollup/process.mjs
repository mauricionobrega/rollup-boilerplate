const env = process.env
const enabledEnvs = [
  'ENV',
  'NODE_ENV',
  'APP_ENV',
  'PROFILE',
]

export const envs = Object.keys(env).filter(key => enabledEnvs.includes(key)).reduce((obj, key) => {
  obj[key] = env[key];
  return obj;
}, {});
