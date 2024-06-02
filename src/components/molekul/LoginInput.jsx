import useInput from "../../custom_hooks/useInput";
import PropTypes from "prop-types";

export const LoginInput = ({ login }) => {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const onLoginHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="grid" onSubmit={onLoginHandler}>
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
      <div className="mb-6">
        <label className="mb-1 block font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="w-full border border-slate-300 p-2 focus:outline-slate-400"
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <button
        className="bg-slate-600 py-2 text-white hover:bg-slate-700"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
