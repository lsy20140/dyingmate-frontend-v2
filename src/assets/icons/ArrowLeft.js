import * as React from "react";
const SvgArrowLeft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={154}
    height={154}
    fill="none"
    {...props}
  >
    <g filter="url(#arrowLeft_svg__a)">
      <circle
        cx={77}
        cy={73}
        r={39}
        stroke="#fff"
        strokeWidth={2}
        shapeRendering="crispEdges"
        transform="rotate(180 77 73)"
      />
    </g>
    <path
      stroke="#fff"
      strokeWidth={2}
      d="M84.764 85.54 70.178 75.061a1 1 0 0 1-.138-1.505l12.568-13.093"
    />
    <defs>
      <filter
        id="arrowLeft_svg__a"
        width={154}
        height={154}
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
          result="effect1_dropShadow_920_19558"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_920_19558"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgArrowLeft;
