import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { ThreadDetail } from "./pages/ThreadDetail";
import { AddThread } from "./pages/AddThread";
import { Navigation } from "./components/molekul/Navigation";
import { Leaderboards } from "./pages/Leaderboards";
import { Loading } from "./components/atom/Loading";

export const App = () => {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
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
            <Route path="/*" element={<Login />} />
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
