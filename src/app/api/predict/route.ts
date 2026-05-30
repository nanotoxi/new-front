export async function POST() {
  return Response.json({
    prediction: "Benign",
    confidence: 92,
  });
}