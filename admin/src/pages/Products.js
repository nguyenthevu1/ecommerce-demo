import { useEffect, useState } from 'react';
// material
import {
  Avatar,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
// components
import Page from '../components/Page';
import { UserListHead } from '../sections/@dashboard/user';
// mock
import UserApi from '../fecthApi/UserApi';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'Image', label: 'Image', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'Role', label: 'Role', alignRight: false },
  { id: 'mail', label: 'Email', alignRight: false },
  { id: 'createAt', label: 'Create At', alignRight: false },
  { id: '' },
];

export default function EcommerceShop() {
  const [fillUser, setFillUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const { data: filUser } = await UserApi.getAll();
      setFillUser(filUser.users);
    };
    getUser();
  }, []);

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Users
        </Typography>
        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {fillUser.map((row, index) => (
                  <TableRow hover tabIndex={-1} role="checkbox" key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar />
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell>{row.isAdmin ? 'is Admin' : 'is User'}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{moment(row.createdAt).calendar()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Page>
  );
}
