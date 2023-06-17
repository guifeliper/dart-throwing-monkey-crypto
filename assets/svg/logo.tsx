import { SVGProps } from "react"
import * as React from "react"

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="173"
    height="236"
    viewBox="0 0 173 236"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M113.787 0.0039978H165.278C169.022 0.0039978 173.166 2.504 172.857 6.392L138.233 188.982C137.274 194.182 135.423 197.972 130.657 197.972H80.164C78.3509 197.972 76.5962 197.331 75.2098 196.163C73.8235 194.994 72.8949 193.373 72.588 191.586L106.211 8.986C106.81 4.458 109.021 0.0039978 113.787 0.0039978Z"
      fill="url(#paint0_linear_1_4)"
    />
    <path
      d="M31.076 89.613H82.566C86.311 89.613 90.455 92.113 90.145 96L65.645 226.189C64.686 231.389 62.835 235.179 58.069 235.179H7.57599C5.76292 235.179 4.00828 234.538 2.62201 233.369C1.23574 232.201 0.307051 230.58 0 228.793L23.5 98.602C24.099 94.07 26.31 89.613 31.076 89.613Z"
      fill="url(#paint1_linear_1_4)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_4"
        x1="3286.53"
        y1="174.216"
        x2="3355.16"
        y2="28.4756"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#043C96" />
        <stop offset="1" stopColor="#0065B8" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1_4"
        x1="38.4088"
        y1="212.034"
        x2="74.559"
        y2="109.171"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#02A7D3" />
        <stop offset="1" stopColor="#4CB8FB" />
      </linearGradient>
    </defs>
  </svg>
)

export default Logo
