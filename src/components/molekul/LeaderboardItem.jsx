import PropTypes from "prop-types";

export const LeaderboardItem = ({ name, email, avatar, score }) => {
  return (
    <tr className="hover:bg-slate-100">
      <td>
        <div className="flex gap-2">
          <img src={avatar} width={50} alt="" />
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="font-light">{email}</p>
          </div>
        </div>
      </td>
      <td className="text-center">{score}</td>
    </tr>
  );
};

LeaderboardItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
