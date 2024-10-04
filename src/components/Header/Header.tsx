import React from "react";

export interface BasicTextProps {
  text: string;
  styling?: string;
  variant: "primary";
}

const variants = {
  primary: "text-[34px] leading-[40px]",
};

export const Header = ({
  variant,
  text,
  styling,
}: BasicTextProps): JSX.Element => {
  return (
    <h1 className={`${variants[variant]} font-bold  ${styling ?? ""}`}>
      {text}
    </h1>
  );
};
Header.displayName = "Header";
