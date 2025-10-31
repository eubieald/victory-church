import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from 'bcrypt';
import { signUpSchema } from "@/app/components/utils/zschema";

type User = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function GET() {
  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  try {
    // Get request body
    const body = await req.json();
    const { username, email, password, confirmPassword }: User = signUpSchema.parse(body);

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: "Passwords do not match" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await checkUserExists(username, email);
    if (existingUser) {
      const field = existingUser.username === username ? 'username' : 'email';
      return NextResponse.json({ success: false, message: `User with this ${field} already exists` }, { status: 409 });
    }

    // Encrypt password with bcrypt
    const hashedPassword = await hash(password, 10);

    // Create new user in the database with hashed password
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ success: true, user: rest, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    // Handle error with type assertion
    if (error instanceof Error) {
      console.error("User creation error:", error.message);
      return NextResponse.json({ success: false, message: error.message || "An error occurred during user creation" }, { status: 500 });
    } else {
      // Handle unexpected error types
      console.error("Unexpected error:", error);
      return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
    }
  }
}

const checkUserExists = async (username: string, email: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    }
  });
}
