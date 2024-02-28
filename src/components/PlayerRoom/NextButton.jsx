import React from 'react'

export default function NextButton({color}) {
  return (
    <svg width="174" height="174" viewBox="0 0 174 174" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group 14265">
        <g id="Ellipse 11" filter="url(#filter0_d_726_3980)">
          <circle cx="87" cy="83" r="50" fill={color}/>
          <circle cx="87" cy="83" r="49" stroke="white" stroke-width="2"/>
        </g>
        <path id="Vector 2" d="M77.2979 67.3287L95.7643 80.5937C96.2586 80.9488 96.3237 81.6594 95.9023 82.0984L79.9927 98.672" stroke="white" stroke-width="2"/>
      </g>
      <defs>
        <filter id="filter0_d_726_3980" x="0" y="0" width="174" height="174" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="18.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_726_3980"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_726_3980" result="shape"/>
        </filter>
      </defs>
    </svg>
  )
}
