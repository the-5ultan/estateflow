import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginPage from "./LoginPage";

const connection = vi.hoisted(() => ({ isPending: false, isError: true }));
vi.mock("../../hooks/useSystemStatus", () => ({
  useSystemStatus: () => connection,
}));

describe("Login screen", () => {
  beforeEach(() => {
    connection.isPending = false;
    connection.isError = true;
  });
  it("keeps sign-in controls and an honest notice visible when the backend is offline", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(
      screen.getByRole("heading", { name: "Welcome Back!" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Google" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Backend unavailable/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Register as an agent/ }),
    ).toHaveAttribute("href", "/agents/register");
  });

  it("keeps the Google control visible while availability is loading", () => {
    connection.isPending = true;
    connection.isError = false;
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(
      screen.getByText("Checking platform availability…"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Google" }),
    ).toBeEnabled();
  });
});
