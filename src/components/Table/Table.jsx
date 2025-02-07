import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useContext } from 'react';
import { CurrentBackgroundContext } from '../../context/createContext';
import styles from './Table.module.css';

const UsersTable = () => {
  const { activeIndex } = useContext(CurrentBackgroundContext);

  const usersTemplate = [
    [
      { name: 'Alice', time: '08:30' },
      { name: 'Bob', time: '09:15' },
      { name: 'Charlie', time: '10:45' },
      { name: 'David', time: '11:20' },
      { name: 'Emma', time: '12:05' },
      { name: 'Frank', time: '13:30' },
      { name: 'Grace', time: '14:50' },
      { name: 'Henry', time: '15:10' },
      { name: 'Ivy', time: '16:25' },
      { name: 'Jack', time: '17:40' },
    ],
    [
      { name: 'Kevin', time: '18:05' },
      { name: 'Laura', time: '19:20' },
      { name: 'Mike', time: '20:15' },
      { name: 'Nancy', time: '21:30' },
      { name: 'Oscar', time: '22:10' },
      { name: 'Paul', time: '23:05' },
      { name: 'Quinn', time: '00:45' },
      { name: 'Rachel', time: '01:30' },
      { name: 'Steve', time: '02:20' },
      { name: 'Tina', time: '03:10' },
    ],
    [
      { name: 'Uma', time: '04:25' },
      { name: 'Victor', time: '05:50' },
      { name: 'Wendy', time: '06:35' },
      { name: 'Xander', time: '07:15' },
      { name: 'Yasmine', time: '08:40' },
      { name: 'Zane', time: '09:55' },
      { name: 'Amy', time: '10:05' },
      { name: 'Brian', time: '11:15' },
      { name: 'Catherine', time: '12:50' },
      { name: 'Daniel', time: '13:30' },
    ],
  ];
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        {/* Table Head */}
        <TableHead>
          <TableRow className={styles.tableHeader}>
            <TableCell className={styles.headerCell}>Rank</TableCell>
            <TableCell className={styles.headerCell}>Name</TableCell>
            <TableCell className={styles.headerCell}>Time</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {usersTemplate[activeIndex].map((user, index) => (
            <TableRow
              key={index}
              className={`${styles.tableRow} ${
                index % 2 === 0 ? styles.rowEven : styles.rowOdd
              }`}
            >
              <TableCell className={styles.cell}>{index + 1}</TableCell>
              <TableCell className={styles.cell}>{user.name}</TableCell>
              <TableCell className={styles.cell}>{user.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
