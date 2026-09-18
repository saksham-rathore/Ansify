import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 500 });
    }

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/Ansify",
      },
      headers: req.headers,
      asResponse: true,
    });

    return result;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
