import { MdScreenRotation } from "react-icons/md";

interface Props {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RotateShipButton = ({ setState }: Props) => {
  return (
    <button
      aria-label="rotate ship button"
      className="w-full px-8 py-4 flex justify-center text-slate-900 rounded font-semibold text-lg uppercase tracking-widest hover:text-cyan-100 hover:bg-slate-900 duration-150 bg-cyan-100"
      onClick={() => setState((state) => !state)}
    >
      <MdScreenRotation className="text text-3xl" />
    </button>
  );
};
