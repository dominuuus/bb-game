import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.secondary};
  width: 2rem;
  height: 30rem;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  z-index: 100;
  position: fixed;
  left: 0;
  transition: 0.4s;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 10px 15px 10px 10px;
  div {
    margin-top: 20px;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    width: 4rem;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    span {
      opacity: 1;
    }

    a {
      color: ${(props) => props.theme.colors.white};

      &:hover {
        color: ${(props) => props.theme.colors.linkHover};
      }
    }
  }
`;
export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;

  overflow: hidden;

  span {
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    cursor: pointer;
    width: 4rem;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const MenuIcon = styled.span``;

export const MenuBlockOne = styled.div`
  margin-top: 50px;
`;

export const MenuBlockTwo = styled.div`
  margin-bottom: 50px;
`;
