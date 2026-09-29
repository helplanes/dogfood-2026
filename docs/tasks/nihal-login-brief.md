# Task Brief: Nihal - Login Flow

## Objective
Build the participant login flow for Dogfood 2026. This includes a static login form with visible validation and server-error states.

## Constraints
- **Role:** Nihal (Participant Journey)
- **Wait for Scaffold:** Do not initialize `package.json` or Next.js config. Krish must provide the base scaffold.
- **Dependencies:** Use Shriyash's shared UI components (`src/components/ui/**`) once available.

## Requirements
1. **Screen Location:** `/login` (or inside `src/app/(auth)/login/page.tsx`).
2. **Fields:**
   - Email Input
   - Password Input
   - Submit Button
3. **States to Handle:**
   - Empty field validation errors.
   - 401 Unauthorized / Invalid credentials error.
4. **Next Steps:**
   - Once Krish provides the `package.json` scaffold and auth API contract, implement the UI statically.
   - Hand off to Krish for final API wiring.

## Handoff Status
- Requested base scaffold and Auth API shape from Krish via `HANDOFF.md`.
