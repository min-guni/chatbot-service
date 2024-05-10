import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-radius: 15px;
  font-family: 'Pretendard-ExtraBold';
`;

const StyledThead = styled.thead`
  background: linear-gradient(to right, #d3e8f7, #e9dcf9);
  text-align: center;
  border-radius: 15px;
  font-family: 'Pretendard-ExtraBold';
`;

const StyledTh = styled.th`
  padding: 12px;
  color: #252a2f;
  text-align: center;
  border-radius: 15px;
  font-family: 'Pretendard-ExtraBold';
`;

const StyledTd = styled.td`
  padding: 8px;
  text-align: center;
  border-radius: 15px;
  font-family: 'Pretendard-ExtraBold';
  color: #252a2f;
`;

const StyledTr = styled.tr`
  border-radius: 15px;
  font-family: 'Pretendard-ExtraBold';
  color: #252a2f;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;


function Table({ columns, data, className }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <StyledTable className={className} {...getTableProps()}>
      <StyledThead>
        {headerGroups.map(headerGroup => (
          <StyledTr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <StyledTh {...column.getHeaderProps()}>{column.render('Header')}</StyledTh>
            ))}
          </StyledTr>
        ))}
      </StyledThead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <StyledTr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <StyledTd {...cell.getCellProps()}>{cell.render('Cell')}</StyledTd>;
              })}
            </StyledTr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

export default Table;
