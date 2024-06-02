import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetLeaderboards } from "../states/leaderboards/action";
import { LeaderBoardList } from "../components/molekul/LeaderBoardList";

export const Leaderboards = () => {
  const { leaderboards = [] } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div className="p-4 mt-20">
      <LeaderBoardList leaderboards={leaderboards} />
    </div>
  );
};
