import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M88,144,32,200H224a8,8,0,0,0,8-8V112"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <path
        d="M168,112,224,56H32a8,8,0,0,0-8,8V144"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </svg>
  ),
};
