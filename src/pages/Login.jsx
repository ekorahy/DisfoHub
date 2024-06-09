import { useDispatch } from "react-redux";
import { LoginInput } from "../components/molekul/LoginInput";
import { asyncSetAuthUser } from "../states/authUser/action";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }, navigate));
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center">
      <div className="absolute left-20 top-10 h-48 w-48 animate-blob rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="animation-delay-2000 absolute right-20 top-4 h-48 w-48 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="animation-delay-4000 absolute bottom-10 right-60 h-48 w-48 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="z-10 w-96 bg-white/60 p-8 backdrop-blur-sm sm:w-3/5 sm:p-8 md:w-1/2">
        <div className="mx-auto my-3 w-max">
          <img className="mx-auto mb-1" src="/logo.png" width={60} />
          <h1 className="sm:text-md bg-gradient-to-r from-purple-300 via-yellow-300 to-pink-300 bg-clip-text text-sm font-bold text-transparent">
            Disfo<span>Hub</span>
          </h1>
        </div>
        <div className="border-b border-dashed py-4">
          <h2 className="text-lg font-bold">Login Form</h2>
          <p className="text-sm">
            Please enter your email and password to log in.
          </p>
        </div>
        <div className="py-4">
          <LoginInput login={onLogin} />
          <p className="sm:text-md mt-6 border-b border-dashed pb-2 text-center text-sm">
            Don&apos;t have an account yet?{" "}
            <Link
              className="text-slate-600 underline hover:font-bold hover:text-slate-700"
              to="/register"
            >
              Register here
            </Link>
          </p>
          <p className="sm:text-md mt-2 text-center text-sm">
            Return to{" "}
            <Link
              className="text-slate-600 underline hover:font-bold hover:text-slate-700"
              to="/"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
