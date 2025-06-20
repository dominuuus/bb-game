import styled from "styled-components";

export const AstronautProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
    text-transform: uppercase;
  }

  img {
    height: 43rem;

    &:hover {
      transform: scale(1.15);
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    img {
      height: 30rem;
    }
  }
`;

export const Astronaut3DContainer = styled.div``;
