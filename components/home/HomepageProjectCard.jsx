import { Chip } from "components/common";
import { motion } from "framer-motion";
import { nanoid } from 'nanoid'

import {useRouter} from "next/router";

const colors = {
  red: "bg-js-red  border-js-red",
  green: "bg-js-green  border-js-green",
  blue: " bg-js-blue border-js-blue",
  yellow: "bg-js-yellow  border-js-yellowŚ",
};

export default function HomepageProjectCard({
  setSelected,
  id,
  title = "Title",
  img,
  color = "yellow",
  tags = [],
}) {
  return (
    <motion.div
      key={id}
      onClick={() => {
        setSelected(id);
      }}
      layoutId={id}
      whileTap={{ scale: 0.95 }}
      className={`${colors[color]}relative flex w-full flex-col overflow-hidden
		 rounded-lg border-2 text-white `}
    >
      <ul className="absolute flex gap-2 p-3 ">
        {tags.map((tag, index) => {
          return <Chip className=" bg-zinc-800 font-bold" name={tag} key={nanoid()}/>;
        })}
      </ul>
      <img src={img} className="h-60 w-full" />
      <h4 className="w-1/2 p-4 font-poppins text-2xl font-bold">{title}</h4>
    </motion.div>
  );
}
