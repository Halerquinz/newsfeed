import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";

interface DropdownControllerProps {
  className?: string;
  overlay: () => React.ReactNode;
  zIndex?: number;
  children?: React.ReactNode;
  innerClassName?: string;
}

export const DropdownController: React.FC<DropdownControllerProps> = ({
  className,
  overlay,
  zIndex,
  children,
  innerClassName,
}) => {
  const [visible, setVisibility] = useState(false);
  const referenceRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  console.log(visible);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current
  );

  console.log(styles);
  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        referenceRef.current?.contains(event.target) ||
        popperRef.current?.contains(event.target)
      ) {
        return;
      }
      setVisibility(false);
    };
    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const body = (
    <div
      className={`absolute ${className}`}
      ref={popperRef}
      {...attributes.popper}
      style={{ zIndex: zIndex || 5 }}
    >
      <div
        style={styles.offset}
        className={`${visible ? "" : "hidden"} ${innerClassName}`}
      >
        {visible ? overlay() : null}
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <button
        className="focus:outline-no-chrome flex"
        onClick={() => setVisibility(!visible)}
      >
        {children}
      </button>
      {body}
    </React.Fragment>
  );
};
