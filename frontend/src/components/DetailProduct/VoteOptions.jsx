import React, { memo, useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { voteOptions } from "../../ultils/constans";
import { Button } from "../index";

function VoteOptions({ handleSubmitVoteOptions }) {
  const { StarOutlineIcon, StarIcon } = icons;
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const modalRef = useRef();
  const detailProduct = useSelector((state) => state.product.detailProduct);

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px] h-[500px]"
    >
      <div className="p-10">
        <div className="flex justify-between items-center">
          <div className="flex">
            <img
              src={detailProduct?.thumb}
              alt={detailProduct?.title}
              className="w-[100px]"
            />
            <div>
              <div className="font-medium">My Review</div>
              <div className="text-2xl font-semibold w-[500px]">
                {detailProduct?.title}
              </div>
            </div>
          </div>
          <button>X</button>
        </div>
        <div className="mt-3 font-second">
          <label htmlFor="" className="font-bold text-sm">
            Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-[100px] text-xs p-2 outline-none border border-gray-400"
            placeholder="Example: Let us know what you like about this product-share you favorite features and benefits"
          ></textarea>
        </div>
        <div className="mt-3 text-sm font-second font-bold">
          <p>How do you feel this product ?</p>
          <div className="flex items-center justify-center my-3 gap-5">
            {voteOptions.map((element) => (
              <div
                key={element.id}
                onClick={() => setChosenScore(element.id)}
                className="w-[60px] h-[60px] flex items-center justify-center flex-col gap-2 cursor-pointer border border-black hover:bg-black hover:text-white"
              >
                {Number(chosenScore) && chosenScore >= element.id ? (
                  <StarIcon />
                ) : (
                  <StarOutlineIcon />
                )}
                <span>{element.text}</span>
              </div>
            ))}
          </div>
        </div>
        <Button
          name="Submit"
          handleOnClick={() =>
            handleSubmitVoteOptions({ comment, score: chosenScore })
          }
        />
      </div>
    </div>
  );
}

export default memo(VoteOptions);
