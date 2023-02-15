import { GrFormClose } from "react-icons/gr";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  callBack?: (...args: any) => any;
}

export const Modal = ({ children, callBack }: Props) => {
  return (
    <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 flex justify-center items-center">
      <div className="max-w-2xl relative bg-cyan-100 w-full m-3 pt-20 pb-12 px-4 rounded-xl text-slate-900">
        {callBack && (
          <button
            onClick={callBack}
            className="absolute right-4 top-4 text-4xl"
          >
            <GrFormClose />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
