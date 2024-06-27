import styled from 'styled-components';

import BallIconSVGProject from '../svg/BallIconSVGProject';

export const RotatingBallIcon = styled(BallIconSVGProject)`
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
