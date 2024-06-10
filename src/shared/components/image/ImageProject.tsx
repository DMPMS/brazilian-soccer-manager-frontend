interface ImageProjectProps {
  src?: string;
  width?: number;
  height?: number;
  margin?: string;
}

const ImageProject = ({ src, width, height, margin }: ImageProjectProps) => {
  return <img src={src} width={width} height={height} style={{ margin: margin }} />;
};

export default ImageProject;
