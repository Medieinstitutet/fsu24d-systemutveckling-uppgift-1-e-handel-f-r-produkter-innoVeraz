import bcrypt from "bcryptjs";
import clientPromise from "../src/lib/mongodb"; // OBS: relativ import från root, inte "@/lib"

async function createAdmin() {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  const existing = await users.findOne({ email: "admin@plantbuds.se" });
  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await users.insertOne({
    email: "admin@plantbuds.se",
    password: hashedPassword,
    role: "admin",
    created_at: new Date(),
  });

  console.log("Admin user created!");
}

createAdmin()
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
