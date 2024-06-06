import { LeaderboardItem } from "./LeaderboardItem";
import PropTypes from "prop-types";

export const LeaderBoardList = ({ leaderboards }) => {
  return (
    <table className="w-full border-separate border-spacing-y-4">
      <thead className="text-lg">
        <tr>
          <th className="text-center">No.</th>
          <th className="text-start">Users</th>
          <th className="text-center">Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboards.map((leaderboard, index) => (
          <LeaderboardItem
            key={leaderboard.user.id}
            {...leaderboard.user}
            score={leaderboard.score}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
};

LeaderBoardList.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};
