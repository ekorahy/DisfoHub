/**
 * Scenario testing
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should handle confirm password typing correctly
 *  - should call register function when register button is clicked
 */

import matchers from "@testing-library/jest-dom/matchers";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RegisterInput } from "./RegisterInput";
import userEvent from "@testing-library/user-event";

expect.extend(matchers);

describe("RegisterInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle name typing correctly", async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByLabelText("Name");

    // action
    await userEvent.type(nameInput, "John Doe");

    // assert
    expect(nameInput).toHaveValue("John Doe");
  });

  it("should handle email typing correctly", async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByLabelText("Email");

    // action
    await userEvent.type(emailInput, "johnDoe@gmail.com");

    // assert
    expect(emailInput).toHaveValue("johnDoe@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByLabelText("Password");

    // action
    await userEvent.type(passwordInput, "thisispassword");

    // assert
    expect(passwordInput).toHaveValue("thisispassword");
  });

  it("should handle confirm password typing correctly", async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const confirmPasswordInput =
      await screen.getByLabelText("Confirm Password");

    // action
    await userEvent.type(confirmPasswordInput, "thisispassword");

    // assert
    expect(confirmPasswordInput).toHaveValue("thisispassword");
  });

  it("should call register function when register button is clicked", async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByLabelText("Name");
    await userEvent.type(nameInput, "John Doe");
    const emailInput = await screen.getByLabelText("Email");
    await userEvent.type(emailInput, "johnDoe@gmail.com");
    const passwordInput = await screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "thisispassword");
    const confirmPasswordInput =
      await screen.getByLabelText("Confirm Password");
    await userEvent.type(confirmPasswordInput, "thisispassword");
    const registerButton = await screen.getByRole("button", {
      name: "Register",
    });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: "John Doe",
      email: "johnDoe@gmail.com",
      password: "thisispassword",
    });
  });
});
