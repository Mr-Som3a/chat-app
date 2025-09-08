import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import User from "./users.model.js";

export const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany();

    const users = [];

    for (let i = 0; i < 15; i++) {
      const hashedPassword = await bcrypt.hash("password123", 10); // same password for simplicity
      users.push({
        email: faker.internet.email().toLowerCase(),
        fullName: faker.person.fullName(),
        password: hashedPassword,
        picturePath: faker.image.avatar(),
      });
    }

    await User.insertMany(users);
    console.log("✅ 15 Users seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

