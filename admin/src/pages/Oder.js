import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Checkbox, Container, Grid, Stack, Table,
  TableBody, TableCell, TableContainer, TableRow, Typography
} from '@mui/material';
// ----------------------------------------------------------------------
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import UserListHead from '../sections/@dashboard/user/UserListHead';
  
import OrderApi from '../fecthApi/OrderApi';
import UserMoreMenu from '../sections/@dashboard/user/UserMoreMenu';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'ID', label: 'ID', alignRight: false },
  { id: 'Paid', label: 'Paid', alignRight: false },
  { id: 'Delivered', label: 'Delivered', alignRight: false },
  { id: 'TotalPrice', label: 'TotalPrice', alignRight: false },
  {id:"Demo",label:"Demo",alignRight:false},
  { id: '' },
];

export default function Oder() {
  const [order, setOrder] = useState();
  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = order.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDelivered = async (id) => {
    await OrderApi.delivered(id);
    window.location.reload();
  };
  useEffect(() => {
    const getAll = async () => {
      const { data } = await OrderApi.getAll();
      setOrder(data);
    };
    getAll();
  }, []);

  return (
    <Page title="Dashboard: Oder">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={'asc'}
                  headLabel={TABLE_HEAD}
                  rowCount={order?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {order &&
                    order.map((row) => {
                      const { _id, user, isPaid, isDelivered, totalPrice } = row;
                      const isItemSelected = selected.indexOf(user) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                <RouterLink to={`/dashboard/oder/${_id}`}>{_id}</RouterLink>
                              </Typography>
                            </Stack>
                          </TableCell>
                         
                          <TableCell
                            className="description"
                            align="left"
                            style={{
                              height: '88px',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: isPaid ? 'green' : 'red',
                                height: '44px',
                                width: '60%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                cursor: 'context-menu',
                              }}
                            >
                              {isPaid ? 'Paid' : 'Not Paid'}
                            </div>
                          </TableCell>
                          {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                          <TableCell align="left">
                            {/* <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label> */}
                            <div
                              style={{
                                backgroundColor: isDelivered ? 'green' : 'red',
                                height: '44px',
                                width: '60%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                cursor: 'context-menu',
                              }}
                              onClick={() => handleDelivered(_id)}
                            >
                              {isDelivered ? 'Delivered' : 'Not Deliver'}
                            </div>
                          </TableCell>
                          <TableCell align="left">${totalPrice}</TableCell>
                          <TableCell align="right">
                            <UserMoreMenu id={_id} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>
        </Grid>
      </Container>
    </Page>
  );
}
