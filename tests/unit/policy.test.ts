import { describe, expect, it } from "vitest";
import { authorize } from "@/policy";

describe("authorize", () => {
  it("allows the gallery for visitors", () => {
    expect(authorize({ userId: null, role: "visitor" }, "gallery:read")).toEqual({ ok: true });
  });
  it("returns 401 for anonymous and 403 for signed-in wrong role", () => {
    expect(authorize({ userId: null, role: "visitor" }, "judge:scores:read")).toEqual({ ok: false, status: 401 });
    expect(authorize({ userId: "u1", role: "participant" }, "judge:scores:read")).toEqual({ ok: false, status: 403 });
  });
});
