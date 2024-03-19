import * as React from "react";
const SvgSettingBtn = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <circle
      cx={24}
      cy={24}
      r={23.5}
      fill="#000"
      fillOpacity={0.4}
      stroke="#fff"
    />
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#settingBtn_svg__a)"
    >
      <path d="M24 27a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      <path d="M31.4 27a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V33a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 21 31.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H15a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 16.6 21a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H21a1.65 1.65 0 0 0 1-1.51V15a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V21a1.65 1.65 0 0 0 1.51 1H33a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1" />
    </g>
    <defs>
      <clipPath id="settingBtn_svg__a">
        <path fill="#fff" d="M12 12h24v24H12z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSettingBtn;
