import * as React from "react";
const SvgArrowRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={174}
    height={174}
    fill="none"
    {...props}
  >
    <g filter="url(#arrowRight_svg__a)">
      <circle cx={87} cy={83} r={49} stroke="#fff" strokeWidth={2} />
    </g>
    <path
      stroke="#fff"
      strokeWidth={2}
      d="m77.298 67.329 18.466 13.265a1 1 0 0 1 .138 1.504l-15.91 16.574"
    />
    <defs>
      <filter
        id="arrowRight_svg__a"
        width={174}
        height={174}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={18.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_726_3980"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_726_3980"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgArrowRight;
