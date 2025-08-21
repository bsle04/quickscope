import { sql } from '@/lib/neon';

// GET: List all transactions
export async function GET() {
  try {
    const rows = await sql`SELECT * FROM transactions ORDER BY date DESC, id DESC`;
    return Response.json(rows);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// POST: Add a new transaction
export async function POST(request) {
  try {
    const { date, category, amount, description } = await request.json();
    if (!date || !category || amount === undefined) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const [row] = await sql`
      INSERT INTO transactions (date, category, amount, description)
      VALUES (${date}, ${category}, ${amount}, ${description})
      RETURNING *`;
    return Response.json(row, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}