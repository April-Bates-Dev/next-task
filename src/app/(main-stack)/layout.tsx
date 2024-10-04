import React from "react";
import "../globals.css";

export default function MainStackLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <div className="my-2 mx-8">
        <main className={`p-10 h-full w-full`}>{children}</main>
      </div>
    </>
  );
}
