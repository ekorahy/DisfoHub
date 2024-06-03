import { CgMenuRight } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { RiChatThreadLine } from "react-icons/ri";
import { MdOutlineLeaderboard, MdLogout } from "react-icons/md";
import { GoTriangleUp } from "react-icons/go";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Navigation = ({ user, logout }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [bgColorVisibility, setBgColorVisibility] = useState("");

  const onMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const onProfileHandler = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const listenScrollEvent = () => {
    if (window.scrollY > 30) {
      return setBgColorVisibility("backdrop-blur-xl bg-white/90 shadow");
    } else {
      return setBgColorVisibility("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [bgColorVisibility]);

  return (
    <nav
      className={`relative mx-auto max-w-3xl rounded-3xl ${bgColorVisibility} px-5 py-3`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-8">
          <img src="/logo.png" alt="" width={30} />
          <div className="hidden gap-2 md:flex">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-1 p-2 hover:text-purple-700 ${isActive ? "text-purple-600" : ""}`
              }
              to="/"
            >
              <RiChatThreadLine /> Threads
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-1 p-2 hover:text-purple-700 ${isActive ? "text-purple-600" : ""}`
              }
              to="/leaderboards"
            >
              <MdOutlineLeaderboard /> Leaderboards
            </NavLink>
          </div>
        </div>
        <button className="text-2xl md:hidden" onClick={() => onMenuHandler()}>
          <CgMenuRight />
        </button>
        {user === null ? (
          <div className="hidden gap-2 md:flex">
            <NavLink
              className="rounded-md bg-slate-600/70 px-3 py-1 text-white backdrop-blur-sm hover:bg-slate-700"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="rounded-md border border-slate-600 px-3 py-1  hover:bg-slate-700 hover:text-white"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        ) : (
          <button
            className="hidden md:block"
            onClick={() => onProfileHandler()}
          >
            <img className="rounded-full" src={user.avatar} alt="" width={30} />
          </button>
        )}
      </div>

      {/* navigation drawer for small device */}
      <div
        className={`${isOpenMenu ? "block" : "hidden"} absolute right-5 text-lg`}
      >
        <GoTriangleUp />
      </div>
      <div
        className={`${isOpenMenu ? "block" : "hidden"} top-18 absolute right-4 mt-3 grid bg-white px-4 py-8 shadow-sm`}
      >
        {user !== null && (
          <div className="text-center">
            <img
              className="mx-auto mb-2 rounded-full border-2 border-green-400 p-1"
              src={user.avatar}
              width={60}
              alt=""
            />
            <h2 className="-mb-1 font-bold">{user.name}</h2>
            <p className="border-b pb-3 font-light">{user.email}</p>
          </div>
        )}
        <div className="mt-2 border-b pb-2">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-1 p-2 hover:text-purple-700 ${isActive ? "text-purple-600" : ""}`
            }
            to="/"
          >
            <RiChatThreadLine /> Threads
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-1 p-2 hover:text-purple-700 ${isActive ? "text-purple-600" : ""}`
            }
            to="/leaderboards"
          >
            <MdOutlineLeaderboard /> Leaderboards
          </NavLink>
        </div>
        {user !== null ? (
          <button
            className="mt-3 flex items-center justify-center gap-1 bg-rose-600 py-1 text-white hover:bg-rose-700"
            onClick={() => logout()}
          >
            <MdLogout /> Log out
          </button>
        ) : (
          <div className="grid gap-2 pt-4 text-center">
            <NavLink
              className="bg-slate-600/70 px-3 py-1 text-white backdrop-blur-sm hover:bg-slate-700"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="border border-slate-600 px-3 py-1  hover:bg-slate-700 hover:text-white"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>

      {/* navigatiton profile for large device */}

      {user !== null && (
        <>
          <div
            className={`${isOpenProfile ? "block" : "hidden"} absolute right-6 text-lg`}
          >
            <GoTriangleUp />
          </div>
          <div
            className={`${isOpenProfile ? "block" : "hidden"} top-18 absolute right-1 mt-3 grid bg-white p-8 shadow-sm`}
          >
            <div className="text-center">
              <img
                className="mx-auto mb-2 rounded-full border-2 border-green-400 p-1"
                src={user.avatar}
                width={60}
                alt=""
              />
              <h2 className="-mb-1 font-bold">{user.name}</h2>
              <p className="border-b pb-3 font-light">{user.email}</p>
            </div>
            <button
              className="mt-3 flex items-center justify-center gap-1 bg-rose-600 px-3 py-1 text-white hover:bg-rose-700"
              onClick={() => logout()}
            >
              <MdLogout /> Log out
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

Navigation.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  logout: PropTypes.func.isRequired,
};
