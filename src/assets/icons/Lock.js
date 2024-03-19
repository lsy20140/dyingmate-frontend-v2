import * as React from "react";
const SvgLock = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={38}
    fill="none"
    {...props}
  >
    <rect
      width={25}
      height={20.738}
      x={2.102}
      y={15.317}
      stroke="#fff"
      strokeWidth={3}
      rx={2.5}
    />
    <rect
      width={16.945}
      height={12.315}
      x={1.5}
      y={-1.5}
      stroke="#fff"
      strokeWidth={3}
      rx={2.5}
      transform="matrix(1 0 0 -1 4.82 13.114)"
    />
    <ellipse cx={15.177} cy={27.6} fill="#fff" rx={2.301} ry={2.297} />
    <path stroke="#fff" strokeWidth={3} d="M15.176 27.984v7.657" />
  </svg>
);
export default SvgLock;
