/**
 * Testing Scenario
 *
 * - asyncRegisterUser
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { asyncRegisterUser } from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import Swal from "sweetalert2";

const fakeSuccessResponse = { message: "Successfully registered" };
const fakeErrorResponse = new Error("Registration failed");

describe("asyncRegisterUser thunk", () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    // delete backup data
    delete api._register;
  });

  it("should dispatch action and show success alert when registration succeeds", async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeSuccessResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const navigate = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncRegisterUser(
      { name: "John Doe", email: "john@example.com", password: "password" },
      navigate,
    )(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "success",
      title: "Successfully register an account",
      showConfirmButton: false,
      timer: 1500,
    });
    expect(navigate).toHaveBeenCalledWith("/login");
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // cleanup
    swalSpy.mockRestore();
  });

  it("should dispatch action and show error alert when registration fails", async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const navigate = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncRegisterUser(
      { name: "John Doe", email: "john@example.com", password: "password" },
      navigate,
    )(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: fakeErrorResponse.message,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // cleanup
    swalSpy.mockRestore();
  });
});
