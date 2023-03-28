import React, { useState } from "react";

export interface SwitchProps {
  checked: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked }) => {
  return (
    <div
      className={`relative h-4 w-5.5 rounded-full border px-1 transition duration-400 ease-in-out-hard ${
        checked ? "border-primary-100" : "border-primary-300"
      }`}
    >
      <div
        className={`absolute top-2/4  left-2/4 h-2 w-2 -translate-y-1/2 transform rounded-full transition duration-400 ease-in-out-hard ${
          checked
            ? "translate-x-0 bg-primary-100"
            : "-translate-x-full bg-primary-300"
        }`}
      />
    </div>
  );
};

export interface NativeCheckboxProps {
  title: string;
  subtitle: string;
  onClick?: (num: number | undefined) => void;
  checked?: boolean;
  num?: number;
}

export const NativeCheckbox: React.FC<NativeCheckboxProps> = ({
  title,
  subtitle,
  onClick,
  checked = false,
  num,
}) => {
  return (
    <button
      className="group flex w-full justify-between rounded-8 bg-primary-900 px-3 py-2"
      onClick={onClick ? () => onClick(num) : undefined}
    >
      <div className="flex flex-col items-start">
        <div
          className={`${
            checked
              ? "font-bold text-primary-100 transition duration-200"
              : "font-bold text-primary-300 transition duration-200 group-hover:text-primary-100"
          }`}
        >
          {title}
        </div>
        <div className="text-primary-300">{subtitle}</div>
      </div>
      <div className="flex items-center justify-center">
        <Switch checked={checked} />
      </div>
    </button>
  );
};

export interface NativeCheckboxControllerProps {
  checkboxes: NativeCheckboxProps[];
}

export const NativeCheckboxController: React.FC<
  NativeCheckboxControllerProps
> = ({ checkboxes }) => {
  // Set checked items based on stored users selection
  const [currentChecked, setCurrentChecked] = useState<Array<number>>([]);

  const handleClick = (id: number | undefined) => {
    if (id !== undefined) {
      if (currentChecked.includes(id)) {
        setCurrentChecked(currentChecked.filter((e) => e !== id));
      } else {
        setCurrentChecked([...currentChecked, id]);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {checkboxes.map((c, i) => (
        <NativeCheckbox
          key={c.title + i}
          onClick={handleClick}
          title={c.title}
          subtitle={c.subtitle}
          num={i}
          checked={currentChecked.includes(i)}
        />
      ))}
    </div>
  );
};
