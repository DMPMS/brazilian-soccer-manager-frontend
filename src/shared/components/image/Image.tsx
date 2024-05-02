interface ImageProps {
  src?: string;
  width?: number;
  height?: number;
}

const Image = ({ src, width, height }: ImageProps) => {
  return <img src={src} width={width} height={height} />;
};

export default Image;
