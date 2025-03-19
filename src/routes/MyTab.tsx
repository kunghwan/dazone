import React from "react";
import { MY } from "../contextApi";
import { twMerge } from "tailwind-merge";

<<<<<<< HEAD
const targets: MY.Target[] = [
  "기본정보",
  "비밀번호변경",
  "상품등록",
  "나의상품",
];
=======
const targets: MY.Target[] = ["기본정보", "비밀번호변경"];
>>>>>>> 5ae9d4c3c84e04c73277f39b1002d40930fd488d

const MyTab = () => {
  const { changeTarget, target } = MY.store();

  return (
    <aside className="border-r border-border dark:border-darkBorder">
      <ul className="">
        {targets.map((item) => (
          <li key={item}>
            <button
              className={twMerge(
                "w-full items-start hover:shadow-none",
                target === item && "text-theme"
              )}
              onClick={() => changeTarget(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default MyTab;
