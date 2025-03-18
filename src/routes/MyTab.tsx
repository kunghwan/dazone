import React from "react";
import { MY } from "../contextApi";
import { twMerge } from "tailwind-merge";

const targets: MY.Target[] = ["기본정보", "비밀번호 변경"];
const MyTab = () => {
  const { target } = MY.store();

  return (
    <aside className="border-r border-border dark:border-darkBorder">
      <ul>
        {targets.map((item) => (
          <li key={item}>
            <button
              className={twMerge(
                " w-full items-start ",
                target === item && "text-theme"
              )}
              //   onClick={() => changeTarget(main)}
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
