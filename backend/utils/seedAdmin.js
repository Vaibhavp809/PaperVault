import "dotenv/config";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  await connectDB();

  const name = process.env.ADMIN_NAME || "Librarian";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    process.exit(0);
  }

  await Admin.create({ name, email, password });
  console.log(`Admin created: ${email}`);
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
