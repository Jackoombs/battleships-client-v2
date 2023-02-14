import clsx from "clsx";

interface Props {
  children: string | JSX.Element;
  theme?: "light" | "dark";
  size?: "sm" | "lg";
  center?: boolean;
  bold?: boolean;
  className?: string;
}

export const Text = ({
  children,
  theme = "light",
  size = "sm",
  center = false,
  bold = false,
  className,
}: Props) => {
  return (
    <p
      className={clsx(
        "w-full",
        theme === "light" ? "text-cyan-200" : "text-slate-900",
        size === "sm" && "text-base",
        size === "lg" && "text-lg",
        center && "text-center",
        bold && "font-medium",
        className
      )}
    >
      {children}
    </p>
  );
};
