"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BodyText } from "../BodyText/BodyText";

interface AccordionProps {
  header: string;
  content: string[];
}

const AccordionIcon = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggleAccordion];
};

const Accordion = ({ header, content }: AccordionProps): JSX.Element => {
  const [isOpen, toggleAccordion] = AccordionIcon();

  return (
    <div className="border-b" data-testid="accordion-toggle">
      <div
        className="flex flex-row items-center pb-[10px] cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="pr-4">
          {isOpen ? (
            <Image
              src="/accordion-icons/minus.webp"
              alt="minus"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/accordion-icons/plus.webp"
              alt="plus"
              width={20}
              height={20}
            />
          )}
        </div>
        <BodyText text={header} variant="primary" styling="text-sky-600" />
      </div>
      {isOpen && (
        <div className="pb-[10px]">
          <ul className="list-disc list-inside ml-9">
            {content.map((text, index) => (
              <div className="flex flex-row" key={index}>
                <li />
                <BodyText text={text} variant="primary" styling="font-normal" />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accordion;
