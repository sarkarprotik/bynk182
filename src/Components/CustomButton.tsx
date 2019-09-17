import React, { useState } from "react";
import posed from "react-pose";
import styled from "styled-components";
import { tween } from "popmotion";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Square = posed.button({
  idle: {
    scale: 1,
    opacity: 0.7,
    transition: (props: any) => tween({ ...props, duration: 300 })
  },
  hovered: {
    scale: 1,
    opacity: 1,
    transition: (props: any) => tween({ ...props, duration: 300 })
  }
});

const StyledSquare = styled(Square)`
  width: 200px;
  height: 40px;
  border-radius: 50px;
  background: #9b7ddc;
`;

const CustomButton = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <Container>
      <StyledSquare
        style={{
          fontSize: 20,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column"
        }}
        pose={hovering ? "hovered" : "idle"}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div style={{ justifySelf: "center", alignSelf: "center" }}>Submit</div>
      </StyledSquare>
    </Container>
  );
};

export default CustomButton;
