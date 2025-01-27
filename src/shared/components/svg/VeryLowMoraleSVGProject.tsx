const VeryLowMoraleSVGProject = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="256" cy="256" r="256" fill="#ff0000" />
      <path d="M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z" fill="#D90000" />
      <g transform="scale(1, -1) translate(0, -512) translate(0, 21.63)">
        <polygon
          points="256.0,403.006 313.922,403.006 313.923,234.37 401.907,234.37 256.0,51.072 256.0,403.006 198.078,403.006 198.077,234.37 110.093,234.37 256.0,51.072"
          fill="#E9E9EA"
        />
        <polygon
          points="256.0,403.006 198.078,403.006 198.077,234.37 110.093,234.37 256.0,51.072"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
};

export default VeryLowMoraleSVGProject;
