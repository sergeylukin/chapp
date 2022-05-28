import styled from '@emotion/styled';
import { keyframes } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface SpeechBubbleProps {
  message: string;
  delay: number;
}

const floatAnimationKeyframesName = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 0
  }
  20% {
    opacity: 1;
  }
  80% {
  opacity: 1;
  }
  100% {
    transform: translateY(-15px);
    opacity: 0;
  }
`;

const float2AnimationKeyframesName = keyframes`
  0% {
    line-height: 12px;
    transform: translatey(0px);
  }
  55% {
    transform: translatey(-5px);
  }
  60% {
    line-height: 8px;
  }
  100% {
    line-height: 12px;
    transform: translatey(0px);
  }
`;

type BubbleProps = {
  delay: number;
};

export const StyledSpeechBubble = styled.p<BubbleProps>`
  transform: translateY(0px);
  animation: ${floatAnimationKeyframesName} 5s ease-in-out forwards;
  animation-delay: ${({ delay }) => `${delay}s`};
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 3px;
  font-size: 12px;
  color: #774f38;
  background-color: #ece5ce;
  padding: 7px 10px;
  border-radius: 11px;
  position: relative;
  box-shadow: 10px 10px #83af9b;
  display: inline-block;
  font-family: 'Baloo 2', cursive;
  opacity: 0;

  &:after {
    transform: translatey(0px);
    animation: ${float2AnimationKeyframesName} 5s ease-in-out forwards;
    animation-delay: ${({ delay }) => `${delay}s`};
    content: '.';
    font-weight: bold;
    -webkit-text-fill-color: #ece5ce;
    text-shadow: 22px 22px #83af9b;
    text-align: left;
    font-size: 55px;
    width: 55px;
    height: 11px;
    line-height: 12px;
    border-radius: 11px;
    background-color: #ece5ce;
    position: absolute;
    display: block;
    bottom: -18px;
    left: 0;
    box-shadow: 15px 15px #83af9b;
    z-index: -2;
  }
`;

export function SpeechBubble(props: SpeechBubbleProps) {
  return (
    <StyledSpeechBubble delay={props.delay}>{props.message}</StyledSpeechBubble>
  );
}

export default SpeechBubble;
