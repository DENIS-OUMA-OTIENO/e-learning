import styled from 'styled-components';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';

export const BlueButton = styled(Button)`
  && {
    background-color: #080a43;
    color: #fff;
    margin-bottom: 4px;
    &:hover {
      background-color: #0a1e82;
    }
  }
`;

export const TableData = styled(TableCell)`
&& {
  color: #fff
}
`