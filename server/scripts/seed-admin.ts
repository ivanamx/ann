import { env } from "../env.js";
import { upsertAdminUser } from "../services/auth.js";

async function main() {
  const password = env.ADMIN_PASSWORD;
  if (!password) {
    console.error("Set ADMIN_PASSWORD in .env before running seed:admin");
    process.exit(1);
  }

  const user = await upsertAdminUser({
    email: env.ADMIN_EMAIL,
    password,
    fullName: "Ann Atelier Admin",
    role: "owner",
  });

  console.log(`Admin ready: ${user.email}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
