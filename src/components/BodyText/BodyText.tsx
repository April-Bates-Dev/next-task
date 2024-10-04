import React from "react";

interface BodyTextProps {
  text: string;
  styling?: string;
  variant:
    | "primary"
    | "secondary"
}

const variants = {
  primary: "text-[19px] leading-[25px]",
  secondary: "text-[16px] leading-[22px]",
};

export const BodyText = ({
  variant,
  text,
  styling,
}: BodyTextProps): JSX.Element => {
  return <p className={`${variants[variant]} ${styling ?? ""}`}>{text}</p>;
};
BodyText.displayName = "BodyText";
