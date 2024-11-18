// TaskItemStyles.ts
import styled from '@emotion/styled';
import { Card, ListItemText } from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const StyledCard = styled(Card)`
    width: 100%;
    margin: 8px 0;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f5f5f5;
    }
`;

export const StyledListItemText = styled(ListItemText) <{ completed: boolean }>`
    color: ${({ completed }) => (completed ? "green" : "orange")};
`;

export const StyledCheckIconCircle = styled(CheckCircleIcon)`
    color: orange
`;