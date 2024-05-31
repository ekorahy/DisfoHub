import { useNavigate } from "react-router-dom";
import useInput from "../../custom_hooks/useInput";
import PropTypes from "prop-types";

export const RegisterInput = ({ register }) => {
  const navigate = useNavigate();
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChanage] = useInput("");

  const onRegisterHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords are not the same.");
    } else {
      register({ name, email, password });
      navigate("/");
    }
  };

  return (
    <form className="grid" onSubmit={onRegisterHandler}>
      <div className="mb-2">
        <label className="mb-1 block font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="w-full border border-slate-300 py-2 focus:outline-slate-400"
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
          className="w-full border border-slate-300 py-2 focus:outline-slate-400"
          id="email"
          type="text"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="mb-1 block font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="w-full border border-slate-300 py-2 focus:outline-slate-400"
          id="password"
          type="text"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="mb-1 block font-semibold" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="w-full border border-slate-300 py-2 focus:outline-slate-400"
          id="password"
          type="text"
          value={confirmPassword}
          onChange={onConfirmPasswordChanage}
          required
        />
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
