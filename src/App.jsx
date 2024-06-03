import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { ThreadDetail } from "./pages/ThreadDetail";
import { AddThread } from "./pages/AddThread";
import { Navigation } from "./components/molekul/Navigation";
import { Leaderboards } from "./pages/Leaderboards";
import { Loading } from "./components/atom/Loading";
import Swal from "sweetalert2";

export const App = () => {
  const {
    authUser = null,
    isPreload = false,
    loadingBar,
  } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yeah, sure.",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncUnsetAuthUser());
        Swal.fire({
          title: "Log out!",
          text: "You're successfully logged out",
          icon: "success",
        });
        navigate("/");
      }
    });
  };

  if (isPreload) {
    return null;
  }

  const hideHeaderAndFooter =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      <Loading />
      {hideHeaderAndFooter && (
        <header className="fixed top-0 z-10 w-full p-4">
          <Navigation user={authUser} logout={onLogOut} />
        </header>
      )}
      <main className="mx-auto max-w-3xl">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/thread/:id" element={<ThreadDetail />} />
          <Route path="/add" element={<AddThread />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
        </Routes>
      </main>
      {hideHeaderAndFooter && (
        <footer
          className={`${loadingBar.default === 1 ? "hidden" : "block"} p-4`}
        >
          <p className="text-center">
            &copy; 2024 -{" "}
            <span className="bg-gradient-to-r from-purple-300 via-yellow-300 to-pink-300 bg-clip-text text-sm font-bold text-transparent">
              DisfoHub
            </span>
          </p>
        </footer>
      )}
    </>
  );
};
