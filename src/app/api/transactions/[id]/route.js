import { sql } from '@/lib/neon';

// DELETE: Remove a transaction by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await sql`DELETE FROM transactions WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// PUT: Update a transaction by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { date, category, amount, description } = await request.json();
    const [row] = await sql`
      UPDATE transactions
      SET date = ${date}, category = ${category}, amount = ${amount}, description = ${description}
      WHERE id = ${id}
      RETURNING *`;
    return Response.json(row);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}