import { NextResponse } from 'next/server';

export async function GET() {
  // In a real deployment we would query the Antigravity CLI or internal service.
  // For now we return a static placeholder that matches the current quota.
  const message = 'Sub‑Agent Executions: 30 / 30 (reset in 2h 6m 8s)';
  return NextResponse.json({ message });
}
