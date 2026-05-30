import { cookies } from "next/headers";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const username =
    body.username || "demo";

  const role =
    username === "admin"
      ? "admin"
      : "customer";

  const cookieStore =
    await cookies();

  cookieStore.set(
    "auth-token",
    JSON.stringify({
      email:
        username === "admin"
          ? "admin@titan.ai"
          : "demo@titan.ai",

      role,

      expiresAt:
        Date.now() +
        1000 *
          60 *
          60 *
          24,
    }),
    {
      httpOnly: true,
      path: "/",
    }
  );

  return Response.json({
    success: true,
  });
}