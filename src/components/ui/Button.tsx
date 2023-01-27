import clsx from "clsx";

interface Props {
  children: string;
  theme?: "light" | "dark";
  size?: "sm" | "lg" | "full";
  center?: boolean;
  bold?: boolean;
  type?: "button" | "submit";
  callback?: (...args: any) => any;
}

export const Button = ({
  children,
  theme = "light",
  size = "sm",
  center = false,
  bold = false,
  type = "button",
  callback,
}: Props) => {
  return (
    <button
      type={type}
      onClick={callback}
      className={clsx(
        "duration-150 px-4 py-4 rounded font-semibold text-md uppercase tracking-widest border-2",
        theme === "light" &&
          "bg-cyan-100 text-slate-900 hover:bg-slate-900 hover:text-cyan-100 border-cyan-100",
        theme === "dark" &&
          "bg-slate-900 text-cyan-100 hover:text-slate-900 hover:bg-cyan-100 border-slate-900",
        size === "sm" && "min-w-[8rem]",
        size === "lg" && "min-w-[12rem]",
        size === "full" && "w-full",
        center && "text-center",
        bold && "font-medium"
      )}
    >
      {children}
    </button>
  );
};
