interface ImageProps {
  src?: string;
  width?: number;
  height?: number;
  margin?: string;
}

const Image = ({ src, width, height, margin }: ImageProps) => {
  return <img src={src} width={width} height={height} style={{ margin: margin }} />;
};

export default Image;
