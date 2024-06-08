/**
 * Testing scenario
 *
 * - LoginInput component
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginInput } from "./LoginInput";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

describe("loginInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByLabelText("Email");

    // action
    await userEvent.type(emailInput, "johnDoe@gmail.com");

    // assert
    expect(emailInput).toHaveValue("johnDoe@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByLabelText("Password");

    // action
    await userEvent.type(passwordInput, "thisispassword");

    // assert
    expect(passwordInput).toHaveValue("thisispassword");
  });

  it("should call login function when login button is clicked", async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByLabelText("Email");
    await userEvent.type(emailInput, "johnDoe@gmail.com");
    const passwordInput = await screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "thisispassword");
    const loginButton = await screen.getByRole("button", { name: "Login" });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: "johnDoe@gmail.com",
      password: "thisispassword",
    });
  });
});
