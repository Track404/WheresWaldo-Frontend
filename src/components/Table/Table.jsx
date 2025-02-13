/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import styles from './Table.module.css';
import { format } from 'date-fns';

const UsersTable = ({ usersData }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        {/* Table Head */}
        <TableHead>
          <TableRow className={styles.tableHeader}>
            <TableCell className={styles.headerCell}>Rank</TableCell>
            <TableCell className={styles.headerCell}>Name</TableCell>
            <TableCell className={styles.headerCell}>Time</TableCell>
            <TableCell className={styles.headerCell}>Date</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {usersData.map((user, index) => (
            <TableRow
              key={index}
              className={`${styles.tableRow} ${
                index % 2 === 0 ? styles.rowEven : styles.rowOdd
              }`}
            >
              <TableCell className={styles.cell}>{index + 1}</TableCell>
              <TableCell className={styles.cell}>{user.username}</TableCell>
              <TableCell className={styles.cell}>{user.time}s</TableCell>
              <TableCell className={styles.cell}>
                {format(user.CreateAt, 'dd/MM/yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
