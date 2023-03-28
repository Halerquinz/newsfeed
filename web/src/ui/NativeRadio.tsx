import React, { useState } from "react";

export interface NativeRadioProps {
  icon?: React.ReactElement;
  title: string;
  subtitle: string;
  checked?: boolean;
  onClick?: (id: number | undefined) => void;
  num?: number;
}

export const NativeRadio: React.FC<NativeRadioProps> = ({
  icon,
  title,
  subtitle,
  checked = false,
  onClick,
  num,
}) => {
  return (
    <button
      className="group flex w-full justify-between rounded-8 bg-primary-900 px-3 py-2"
      onClick={onClick ? () => onClick(num) : undefined}
    >
      <div className="flex">
        {icon ? (
          <div className="mr-3 mt-1.5">
            {React.cloneElement(icon, { width: 10, height: 10 })}
          </div>
        ) : null}
        <div className="flex flex-col items-start">
          <div
            className={`font-bold transition duration-100 group-hover:text-primary-100 ${
              checked ? "text-primary-100" : "text-primary-300"
            }`}
          >
            {title}
          </div>
          <div className="text-primary-300">{subtitle}</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative h-4 w-4">
          <div
            className={`${
              checked ? "bg-accent" : ""
            } absolute top-2/4 left-2/4 h-2 w-2 -translate-y-1/2 -translate-x-1/2 transform rounded-full transition duration-100`}
          ></div>
          <div
            className={`${
              checked ? "border-accent" : "border-primary-300"
            } absolute top-2/4 left-2/4 h-4 w-4 -translate-y-1/2 -translate-x-1/2 transform rounded-full border transition duration-100`}
          ></div>
        </div>
      </div>
    </button>
  );
};

export interface NativeRadioControllerProps {
  radios: NativeRadioProps[];
}

export const NativeRadioController: React.FC<NativeRadioControllerProps> = ({
  radios,
}) => {
  const [current, setCurrent] = useState(0); // To be changed by the stored user selection

  const handleClick = (id: number | undefined) => {
    if (id !== undefined) {
      setCurrent(id); // Probably would be easier to pass this func
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {radios.map((r, i) => (
        <NativeRadio
          key={r.title + i}
          title={r.title}
          subtitle={r.subtitle}
          icon={r.icon}
          checked={current === i}
          onClick={handleClick}
          num={i}
        />
      ))}
    </div>
  );
};
