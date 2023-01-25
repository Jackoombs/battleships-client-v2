import clsx from "clsx";

interface Props {
  children: string;
  theme?: "light" | "dark";
  size?: "sm" | "lg";
  center?: boolean;
  bold?: boolean;
}

export const Text = ({
  children,
  theme = "light",
  size = "sm",
  center = false,
  bold = false,
}: Props) => {
  return (
    <p
      className={clsx(
        "w-full",
        theme === "light" ? "text-cyan-200" : "text-slate-900",
        size === "sm" && "text-base",
        size === "lg" && "text-lg",
        center && "text-center",
        bold && "font-medium"
      )}
    >
      {children}
    </p>
  );
};
