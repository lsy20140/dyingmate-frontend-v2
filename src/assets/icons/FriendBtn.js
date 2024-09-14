import * as React from "react";
const SvgFriendBtn = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={66}
    height={66}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.8}
      d="M46.75 57.75v-5.5a11 11 0 0 0-11-11h-22a11 11 0 0 0-11 11v5.5M24.75 30.25c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11M63.25 57.75v-5.5A11 11 0 0 0 55 41.607M44 8.607a11 11 0 0 1 0 21.313"
    />
  </svg>
);
export default SvgFriendBtn;
