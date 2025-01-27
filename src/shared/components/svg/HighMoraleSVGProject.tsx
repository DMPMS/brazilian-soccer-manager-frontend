const HighMoraleSVGProject = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="256" cy="256" r="256" fill="#9acd32" />
      <path d="M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z" fill="#86B22B" />
      <polygon
        points="374.466,343.877 400.906,111.094 168.124,137.535 230.337,199.748 111.094,318.992	193.008,400.906 312.252,281.663 "
        fill="#FFFFFF"
      />
      <polygon
        points="256,127.554 256,337.914 312.252,281.663 374.466,343.877 400.906,111.094 "
        fill="#E9E9EA"
      />
    </svg>
  );
};

export default HighMoraleSVGProject;
