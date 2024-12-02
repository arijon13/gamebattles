import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDatabase } from "../utils/mongoClient";

const router = express.Router();

const dbName = "auth-backend";
const usersCollection = "users";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Ensure JWT_SECRET is set in production
if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in production");
}

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// Helper function to normalize email
const normalizeEmail = (email: string): string => email.trim().toLowerCase();

// Register Route
router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const normalizedEmail = normalizeEmail(email);
    const db = getDatabase(dbName);

    console.log(`[REGISTER] Received payload: ${JSON.stringify({ username, email })}`);
    
    // Check if the user already exists
    const existingUser = await db.collection(usersCollection).findOne({ email: normalizedEmail });

    if (existingUser) {
      console.log(`[REGISTER] Attempt to register with existing email: ${normalizedEmail}`);
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash the password with configurable salt rounds
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = { username, email: normalizedEmail, password: hashedPassword, balance: 100 };

    // Insert new user into the database
    const result = await db.collection(usersCollection).insertOne(newUser);
    console.log(`[REGISTER] New user registered: ${normalizedEmail}`);

    // Generate JWT token
    const token = jwt.sign({ id: result.insertedId }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token, user: { id: result.insertedId, username, email: normalizedEmail, balance: newUser.balance } });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`[REGISTER] Error: ${message}`);
    res.status(500).json({ error: "Failed to register user. Please try again later." });
  }
});

// Login Route
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = normalizeEmail(email);
    const db = getDatabase(dbName);

    console.log(`[LOGIN] Received login attempt for email: ${normalizedEmail}`);
    
    // Find the user in the database
    const user = await db.collection(usersCollection).findOne({ email: normalizedEmail });
    if (!user) {
      console.log(`[LOGIN] Attempt to log in with unregistered email: ${normalizedEmail}`);
      return res.status(404).json({ error: "User not found." });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`[LOGIN] Failed login attempt for email: ${normalizedEmail}`);
      return res.status(400).json({ error: "Invalid credentials." });
    }

    console.log(`[LOGIN] User logged in successfully: ${normalizedEmail}`);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user: { id: user._id, username: user.username, email: normalizedEmail, balance: user.balance } });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`[LOGIN] Error: ${message}`);
    res.status(500).json({ error: "Failed to log in." });
  }
});

export default router;
