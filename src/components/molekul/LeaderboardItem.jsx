import PropTypes from "prop-types";

export const LeaderboardItem = ({ name, email, avatar, score, index }) => {
  let number;
  if (index === 0) {
    number = "🥇";
  } else if (index === 1) {
    number = "🥈";
  } else if (index === 2) {
    number = "🥉";
  } else {
    number = index + 1;
  }

  return (
    <tr className="text-center hover:bg-slate-100">
      <td>{number}</td>
      <td>
        <div className="flex gap-2">
          <img src={avatar} width={50} alt="" />
          <div className="text-start">
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
  index: PropTypes.number.isRequired,
};
