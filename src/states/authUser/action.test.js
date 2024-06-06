/**
 * Testing scenario
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action and show success alert when login succeeds
 *  - should dispatch action and show error alert when login fails
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action and unset auth user
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { asyncSetAuthUser, setAuthUserActionCreator } from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import Swal from "sweetalert2";

const fakeAuthUserResponse = {
  id: "users-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

const fakeErrorResponse = new Error("Login failed");

describe("asyncSetAuthUser thunk", () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it("should dispatch action and show success alert when login succeeds", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve("fakeToken");
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const navigate = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncSetAuthUser(
      { email: "john@example.com", password: "password" },
      navigate,
    )(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith("fakeToken");
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse),
    );
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "success",
      title: "Successfully login",
      showConfirmButton: false,
      timer: 1500,
    });
    expect(navigate).toHaveBeenCalledWith("/");
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // cleanup
    swalSpy.mockRestore();
  });

  it("should dispatch action and show error alert when login fails", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = vi.fn();

    // mock dispatch
    const dispatch = vi.fn();
    const navigate = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncSetAuthUser(
      { email: "john@example.com", password: "password" },
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
