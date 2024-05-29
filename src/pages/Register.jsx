import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";
import { RegisterInput } from "../components/molekul/RegisterInput";
import { Link } from "react-router-dom";

export const Register = () => {
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute left-20 top-10 h-48 w-48 animate-blob rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="animation-delay-2000 absolute right-20 top-4 h-48 w-48 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="animation-delay-4000 absolute bottom-10 right-60 h-48 w-48 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="z-10 w-full bg-white/60 p-4 backdrop-blur-sm sm:w-4/5 sm:p-8 sm:shadow md:w-3/5 xl:w-1/4">
        <div className="mb- mx-auto w-max">
          <img className="mx-auto mb-1" src="/logo.png" width={60} />
          <h1 className="sm:text-md bg-gradient-to-r from-purple-300 via-yellow-300 to-pink-300 bg-clip-text text-sm text-transparent">
            Disfo<span>Hub</span>
          </h1>
        </div>
        <div className="my-6">
          <h2 className="text-lg font-bold">Registration Form</h2>
          <p className="text-sm">
            Please fill in the form below to create a new account.
          </p>
        </div>
        <RegisterInput register={onRegister} />
        <p className="sm:text-md mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            className="text-slate-600 underline hover:font-bold hover:text-slate-700"
            to="/"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
