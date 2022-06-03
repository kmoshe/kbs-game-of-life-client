import styled from 'styled-components';
import { CellStatus } from '../../models/cellStatus';

interface CellProps {
    status: CellStatus;
}

const Cell = styled.td`
    width: 15px;
    height: 15px;
    border: 1px solid lightgray;
`;

const StyledCell = styled(Cell)<CellProps>`
    background: ${props => props.status === CellStatus.ALIVE ? "black" : "white" }
`;

export default StyledCell;