import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <header className="fixed z-10 w-full p-4">
        <Navigation user={authUser} logout={onLogOut} />
      </header>
      <main className="mx-auto max-w-3xl pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ThreadDetail />} />
          <Route path="/add" element={<AddThread />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
        </Routes>
      </main>
    </>
  );
};
