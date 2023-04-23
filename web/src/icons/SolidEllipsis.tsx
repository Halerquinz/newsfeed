import * as React from "react";

function SolidEllipsis(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="#dee3ea"
      {...props}
    >
      <g>
        <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
      </g>
    </svg>
  );
}

export default SolidEllipsis;
