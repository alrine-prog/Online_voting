// app/api/users/[id]/route.js

export async function GET(request, { params }) {
  const { id } = params; // Access URL dynamic params (/api/users/123)
  const { searchParams } = new URL(request.url); // Access query params (?role=admin)
  const role = searchParams.get('role');

  return Response.json({ userId: id, roleFilter: role });
}
