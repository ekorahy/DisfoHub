import { useState } from "react";
import useInput from "../../custom_hooks/useInput";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const RegisterInput = ({ register }) => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const onRegisterHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords are not the same.",
      });
    } else {
      register({ name, email, password });
    }
  };

  return (
    <form className="grid" onSubmit={onRegisterHandler}>
      <div className="mb-2">
        <label className="mb-1 block font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="w-full border border-slate-300 p-2 focus:outline-slate-400"
          id="name"
          type="text"
          value={name}
          onChange={onNameChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="mb-1 block font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="w-full border border-slate-300 p-2 focus:outline-slate-400"
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="mb-1 block font-semibold" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            className="w-full border border-slate-300 p-2 focus:outline-slate-400"
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={onPasswordChange}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-xl text-slate-600 hover:text-slate-700"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-1 block font-semibold" htmlFor="confirm-password">
          Confirm Password
        </label>
        <div className="relative">
          <input
            className="w-full border border-slate-300 p-2 focus:outline-slate-400"
            id="confirm-password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-xl text-slate-600 hover:text-slate-700"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </button>
        </div>
      </div>
      <button
        className="bg-slate-600 py-2 text-white hover:bg-slate-700"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
