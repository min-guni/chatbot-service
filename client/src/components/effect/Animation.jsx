// animations.js
import { keyframes, css } from 'styled-components';

export const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const animationMixin = css`
  animation: ${fadeInSlideUp} 3s ease-out forwards;
`;