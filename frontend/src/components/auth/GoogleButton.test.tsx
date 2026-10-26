import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GoogleButton } from "./GoogleButton";
import { toast } from "sonner";

vi.mock("sonner", () => ({ toast: { info: vi.fn() } }));

describe("Phase 1 Google sign-in", () => {
  it("explains the unavailable OAuth flow without pretending to authenticate", () => {
    render(<GoogleButton />);
    fireEvent.click(
      screen.getByRole("button", { name: "Continue with Google" }),
    );
    expect(toast.info).toHaveBeenCalledWith(
      expect.stringContaining("No authentication is configured yet"),
    );
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
