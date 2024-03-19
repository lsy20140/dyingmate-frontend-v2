import * as React from "react";
const SvgPhoneHeader = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={73}
    height={24}
    fill="none"
    {...props}
  >
    <rect width={3} height={10} x={18} y={7} fill="#000" rx={1} />
    <rect width={3} height={4} x={3} y={13} fill="#000" rx={1} />
    <rect width={3} height={6} x={8} y={11} fill="#000" rx={1} />
    <rect width={3} height={8} x={13} y={9} fill="#000" rx={1} />
    <path
      fill="#000"
      d="m35.646 17.646-1.903-1.903a.268.268 0 0 1 .051-.42 4.29 4.29 0 0 1 4.412 0c.15.09.175.296.051.42l-1.903 1.903a.5.5 0 0 1-.708 0M31.324 13.324l.97.97a.315.315 0 0 0 .427.016 5.04 5.04 0 0 1 6.558 0c.124.107.31.1.427-.016l.97-.97a.435.435 0 0 0-.017-.63 6.964 6.964 0 0 0-9.318 0 .435.435 0 0 0-.017.63"
    />
    <path
      fill="#000"
      d="m28.392 10.392.845.845c.15.15.39.166.558.036a10.18 10.18 0 0 1 12.41 0c.169.13.408.114.558-.036l.845-.845a.5.5 0 0 0-.038-.742 12.01 12.01 0 0 0-15.14 0 .5.5 0 0 0-.038.742"
    />
    <rect
      width={22}
      height={11}
      x={47.5}
      y={6.5}
      stroke="#000"
      opacity={0.3}
      rx={2.5}
    />
    <rect width={19} height={8} x={49} y={8} fill="#000" rx={1} />
    <path fill="#000" d="M71 14a2 2 0 1 0 0-4z" opacity={0.3} />
  </svg>
);
export default SvgPhoneHeader;
