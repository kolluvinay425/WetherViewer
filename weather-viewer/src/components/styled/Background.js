import React from "react";
import styled, { keyframes } from "styled-components";

const moveClouds = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const AnimatedBackgroundContainer = styled.div`
  background: url("https://www.transparenttextures.com/patterns/climpek.png");
  animation: ${moveClouds} 20s linear infinite;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const AnimatedBackground = () => {
  return <AnimatedBackgroundContainer />;
};

export default AnimatedBackground;
