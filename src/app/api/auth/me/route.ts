import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return Response.json({
      user: null,
      isExpired: true,
    });
  }

  return Response.json({
    user: {
      id: 1,
      email: "demo@titanweb.com",
      name: "Titan User",
    },
    isExpired: false,
  });
}