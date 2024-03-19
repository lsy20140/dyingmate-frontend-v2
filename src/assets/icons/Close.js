import * as React from "react";
const SvgClose = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <circle cx={24} cy={24} r={23.5} fill="#666" stroke="#fff" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M30 18 18 30M18 18l12 12"
    />
  </svg>
);
export default SvgClose;
