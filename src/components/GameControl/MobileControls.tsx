import { RotateShipButton } from "./RotateShipButton";
import { StartGameButton } from "./StartGameButton";
import { ShowInfoButton } from "./ShowInfoButton";

interface Props {
  setHighlightOrientationIsX: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileControls = ({ setHighlightOrientationIsX }: Props) => {
  return (
    <div className="lg:hidden grid grid-rows-2 grid-cols-[5fr_1fr] gap-3 pt-4 md:pt-14">
      <RotateShipButton setState={setHighlightOrientationIsX} />
      <ShowInfoButton />
      <StartGameButton />
    </div>
  );
};
