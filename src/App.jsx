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

export const App = () => {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, []);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
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
      <main className="mx-auto max-w-3xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ThreadDetail />} />
          <Route path="/add" element={<AddThread />} />
        </Routes>
      </main>
    </>
  );
};
