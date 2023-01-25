import { Instructions } from "./Instructions";
import { StartGameButton } from "../GameControl/StartGameButton";

export const Sidebar = () => {
  return (
    <aside className="bg-slate-700 hidden lg:block min-w-[20rem] w-full max-w-[20rem] xl:max-w-sm 2xl:max-w-md px-4 pt-10 text-cyan-100">
      <h1 className="text-center font-semibold text-5xl pb-12">Battleships</h1>
      <Instructions />
      <StartGameButton />
    </aside>
  );
};
