// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const packageJsonFile = JSON.parse(
  fs.readFileSync(__dirname + '/package.json'),
);

module.exports = {
  apps: [
    {
      name: packageJsonFile.name,
      script: './dist/main.js',
      type: 'cluster',
      instances: 1,
      env_development: {
        NODE_ENV: 'development',
        PORT: '4000',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '4050',
      },
    },
  ],
};
