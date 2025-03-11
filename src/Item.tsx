import React from "react";

interface ItemProps {
  data: string;
  fn?: () => void;
}

const Item = ({ data, fn }: ItemProps) => {
  return (
    <div>
      Item : {data}
      {fn && <button onClick={fn}>{data}</button>}
    </div>
  );
};

export default Item;
