import { CgMenuRight } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { RiChatThreadLine } from "react-icons/ri";
import { MdOutlineLeaderboard, MdLogout } from "react-icons/md";
import { GoTriangleUp } from "react-icons/go";
import { useState } from "react";
import PropTypes from "prop-types";

export const Navigation = ({ user, logout }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const { name, email, avatar } = user;

  const onMenuHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const onProfileHandler = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  return (
    <nav className="relative mx-auto max-w-3xl rounded-3xl border bg-white px-5 py-3">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-8">
          <img src="/logo.png" alt="" width={30} />
          <div className="hidden gap-2 lg:flex">
            <NavLink className="flex items-center gap-1 p-2" to="/">
              <RiChatThreadLine /> Threads
            </NavLink>
            <NavLink className="flex items-center gap-1 p-2" to="/leaderboards">
              <MdOutlineLeaderboard /> Leaderboards
            </NavLink>
          </div>
        </div>
        <button className="text-2xl lg:hidden" onClick={() => onMenuHandler()}>
          <CgMenuRight />
        </button>
        <button className="hidden lg:block" onClick={() => onProfileHandler()}>
          <img className="rounded-full" src={avatar} alt="" width={30} />
        </button>
      </div>

      {/* navigation drawer for small device */}
      <div
        className={`${isOpenMenu ? "block" : "hidden"} absolute right-9 text-lg`}
      >
        <GoTriangleUp />
      </div>
      <div
        className={`${isOpenMenu ? "block" : "hidden"} top-18 absolute right-4 mt-3 grid border bg-white p-4`}
      >
        <div className="text-center">
          <img
            className="mx-auto mb-2 rounded-full border-2 border-green-400 p-1"
            src={avatar}
            width={60}
            alt=""
          />
          <h2 className="-mb-1 font-bold">{name}</h2>
          <p className="border-b pb-3 font-light">{email}</p>
        </div>
        <div className="mt-2 border-b pb-2">
          <NavLink className="flex items-center gap-1 p-2" to="/">
            <RiChatThreadLine /> Threads
          </NavLink>
          <NavLink className="flex items-center gap-1 p-2" to="/leaderboards">
            <MdOutlineLeaderboard /> Leaderboards
          </NavLink>
        </div>
        <button
          className="mt-3 flex items-center justify-center gap-1 bg-rose-600 py-1 text-white hover:text-rose-700"
          onClick={() => logout()}
        >
          <MdLogout /> Log out
        </button>
      </div>

      {/* navigatiton profile for large device */}
      <div
        className={`${isOpenProfile ? "block" : "hidden"} absolute right-7 text-lg`}
      >
        <GoTriangleUp />
      </div>

      <div
        className={`${isOpenProfile ? "block" : "hidden"} top-18 absolute right-1 mt-3 grid border bg-white p-4`}
      >
        <div className="text-center">
          <img
            className="mx-auto mb-2 rounded-full border-2 border-green-400 p-1"
            src={avatar}
            width={60}
            alt=""
          />
          <h2 className="-mb-1 font-bold">{name}</h2>
          <p className="border-b pb-3 font-light">{email}</p>
        </div>
        <button
          className="mt-3 flex items-center justify-center gap-1 bg-rose-600 py-1 text-white hover:text-rose-700"
          onClick={() => logout()}
        >
          <MdLogout /> Log out
        </button>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
};
