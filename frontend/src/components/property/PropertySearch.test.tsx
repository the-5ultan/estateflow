import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { describe, expect, it } from "vitest";
import { PropertySearch } from "./PropertySearch";

function SearchDestination() {
  return <output aria-label="Selected search">{useLocation().search}</output>;
}

describe("Property search foundation", () => {
  it("restores a shared search URL into the controls", () => {
    render(
      <MemoryRouter
        initialEntries={["/properties?purpose=RENT&city=Lahore&type=PLOT"]}
      >
        <PropertySearch />
      </MemoryRouter>,
    );
    expect(screen.getByRole("combobox", { name: "City" })).toHaveValue(
      "Lahore",
    );
    expect(screen.getByRole("combobox", { name: "Property type" })).toHaveValue(
      "PLOT",
    );
    expect(
      screen.getByRole("button", { name: "Rent a property" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("preserves simultaneous filters in the destination URL", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<PropertySearch />} />
          <Route path="/properties" element={<SearchDestination />} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Rent a property" }));
    fireEvent.change(screen.getByRole("combobox", { name: "City" }), {
      target: { value: "Karachi" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "Property type" }), {
      target: { value: "APARTMENT" },
    });
    fireEvent.submit(screen.getByRole("form", { name: "Property search" }));
    const result = screen.getByLabelText("Selected search");
    expect(result).toHaveTextContent("purpose=RENT");
    expect(result).toHaveTextContent("city=Karachi");
    expect(result).toHaveTextContent("type=APARTMENT");
  });
});
