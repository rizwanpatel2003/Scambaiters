import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Check for required environment variables
if (!process.env.TOKEN_SECRET) {
  throw new Error("TOKEN_SECRET is not defined in environment variables");
}

interface TokenPayload {
  id: string;
  email: string;
}

export async function getToken(request: NextRequest) {
  try {
    // Get token directly from request cookies
    const token = request.cookies.get("token")?.value;
  

    if (!token || !process.env.TOKEN_SECRET) {
      return null;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as unknown as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export function generateToken(payload: TokenPayload) {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET is not defined");
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "7d" // Using fixed expiration time
  });
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  console.log("Setting token cookie...");
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });
  console.log("Token cookie set successfully");
}

export async function removeToken() {
  const cookieStore = await cookies();
  console.log("Removing token cookie...");
  cookieStore.delete("token");
  console.log("Token cookie removed successfully");
} 