/**
 * PM2: API Fastify en 127.0.0.1:3010 (nginx hace proxy en /api/).
 *
 *   cd /home/ivanam/projects/ann
 *   pm2 start deploy/ecosystem.config.cjs
 *   pm2 save
 */

const root = "/home/ivanam/projects/ann";

module.exports = {
  apps: [
    {
      name: "ann-api",
      cwd: root,
      script: `${root}/node_modules/.bin/tsx`,
      args: "server/index.ts",
      interpreter: "none",
      instances: 1,
      autorestart: true,
      max_restarts: 15,
      min_uptime: "10s",
      max_memory_restart: "256M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
