import React, { memo } from "react";
import anonymousAvatar from "../img/anonymous.png";
import moment from "moment";
import icons from "./../ultils/icons";

function Comment({
  image = anonymousAvatar,
  name = "Anonymous",
  updatedAt,
  comment,
  star,
}) {
  const { StarIcon, StarOutlineIcon } = icons;

  const renderStarFromNumber = (number) => {
    if (!Number(number)) {
      return;
    }
    const stars = [];
    for (let i = 0; i < +number; i++) {
      stars.push(<StarIcon key={i} style={{ fontSize: 16 }} />);
    }
    for (let i = 5; i > +number; i--) {
      stars.push(<StarOutlineIcon key={i} style={{ fontSize: 16 }} />);
    }
    return stars;
  };

  return (
    <div className="flex gap-4 py-[10px] border-b border-color-[#ccc]">
      <div className="flex-none">
        <img
          src={anonymousAvatar}
          alt="avatar"
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span>{moment(updatedAt)?.fromNow()}</span>
        </div>
        <div className="flex flex-col gap-2 pl-4 text-sm mt-4">
          <span className="flex items-center gap-1">
            <span className="font-semibold">Vote:</span>
            <span>
              {renderStarFromNumber(star)?.map((element, index) => (
                <span key={index}>{element}</span>
              ))}
            </span>
          </span>
          <span className="flex gap-1">
            <span className="font-semibold">Comment:</span>
            <span className="flex items-center gap-1">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Comment);
