import clsx from "clsx";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
  size?: string;
  color?: string;
}

export const Loading = ({
  size = "text-4xl",
  color = "text-slate-900",
}: Props) => {
  return <BiLoaderAlt className={clsx("animate-spin", size, color)} />;
};
