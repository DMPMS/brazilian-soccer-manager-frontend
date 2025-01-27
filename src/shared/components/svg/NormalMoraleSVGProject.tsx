const NormalMoraleSVGProject = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="256" cy="256" r="256" fill="#ffec00" />
      <path d="M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z" fill="#D9D200" />
      <g transform="translate(256, 256) rotate(90) translate(-256, -256)">
        <g transform="translate(0, 21.63)">
          <polygon points="401.907,234.37 256.0,51.072 110.093,234.37" fill="#E9E9EA" />
          <polygon
            points="313.922,403.006 198.078,403.006 198.078,224.37 313.923,224.37"
            fill="#FFFFFF"
          />
        </g>
      </g>
    </svg>
  );
};

export default NormalMoraleSVGProject;
