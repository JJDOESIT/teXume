const GATEWAY_URL = process.env.GATEWAY_URL;

export async function GET(request, { params }) {
  const { path } = await params;
  const authHeader = request.headers.get("Authorization");

  return await fetch(`${GATEWAY_URL}${path.join("/")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader && { Authorization: authHeader }),
    },
  });
}

export async function POST(request, { params }) {
  const { path } = await params;
  const authHeader = request.headers.get("Authorization");
  const body = await request.json();

  return await fetch(`${GATEWAY_URL}${path.join("/")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader && { Authorization: authHeader }),
    },
    body: JSON.stringify(body),
  });
}
