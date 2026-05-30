export async function POST() {
  return Response.json({
    token: "mock-jwt-token",
    user: {
      id: 1,
      email: "demo@titanweb.com",
      name: "Titan User",
    },
  });
}