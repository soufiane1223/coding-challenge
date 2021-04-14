import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledBox = styled(Box)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  padding: 25px;
`;
