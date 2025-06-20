import styled from "styled-components";

interface ProgressBarProps {
  $progress: number;
  $animate?: boolean;
}

export const ProjectProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProjectProgressContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.medium};
  span {
    font-weight: bold;
    white-space: nowrap;
  }
`;

export const ProjectProgressDefault = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 30px;
  width: 90%;
  font-size: 0.8rem;
`;

const ProjectProgressStatus = styled.div<ProgressBarProps>`
  padding: 0.75rem;
  align-items: center;
  border-radius: 30px;
  color: ${(props) => props.theme.colors.white};
  width: ${(props) => (props.$animate ? props.$progress : 0)}%;
  animation: ${(props) => (props.$animate ? "grow 2.5s linear" : "none")};
  @keyframes grow {
    0% {
      width: 0%;
      transform: scale(1);
    }
    ${(props) => props.$progress} {
      width: ${(props) => props.$progress}%;
      transform: scale(1);
    }
  }
`;

export const ProjectProgressSuccess = styled(ProjectProgressStatus)`
  background-color: ${(props) => props.theme.colors.status.green};
`;
export const ProjectProgressAlert = styled(ProjectProgressStatus)`
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.status.yellow};
`;
export const ProjectProgressCritical = styled(ProjectProgressStatus)`
  background-color: ${(props) => props.theme.colors.status.red};
`;
