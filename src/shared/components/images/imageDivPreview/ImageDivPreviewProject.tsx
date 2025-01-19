import { DivContainer } from './ImageDivPreviewProject.style';

interface ImageDivPreviewProjectProps {
  isValidImage?: boolean;
  src?: string;
  width?: number;
  height?: number;
}

const ImageDivPreviewProject = ({
  isValidImage,
  src,
  width,
  height,
}: ImageDivPreviewProjectProps) => {
  return (
    <DivContainer>
      {isValidImage && src ? (
        <img src={src} width={width} height={height} style={{ display: 'block' }} />
      ) : (
        <div style={{ width: width, height: height, display: 'block' }} />
      )}
    </DivContainer>
  );
};

export default ImageDivPreviewProject;
