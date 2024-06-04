import { postedAt } from "../../utils";
import PropTypes from "prop-types";

export const Profile = ({ avatar, name, createdAt, avatarSize, textSize }) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <img className="rounded-full" src={avatar} width={avatarSize} alt="" />
      <div>
        <p
          className={`${textSize === "text-sm" ? "font-semibold" : "font-bold"} ${textSize === "text-sm" && "text-sm"}`}
        >
          {name}
        </p>
        <p className="text-sm">{postedAt(createdAt)}</p>
      </div>
    </div>
  );
};

Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  avatarSize: PropTypes.number.isRequired,
  textSize: PropTypes.string.isRequired,
};
