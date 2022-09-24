import {
  Container,
  Grid,
  Stack,
  Table,
  TableContainer,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserListHead } from '../user';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import OrderApi from '../../../fecthApi/OrderApi';


const TABLE_HEAD = [
  { id: 'Image', label: 'Image', alignRight: false },
  { id: 'Name', label: 'Name', alignRight: false },
  { id: 'Price', label: 'Price', alignRight: false },
  { id: 'Quantity', label: 'Quantity', alignRight: false },
  { id: '' },
];

const DetailOrder = () => {
  const [detailsOrder, setDetailsOrder] = useState();
  const params = useParams();

  useEffect(() => {
    const getDetailsOrder = async () => {
      const { data } = await OrderApi.detailOrder(params.id);
      setDetailsOrder(data);
    };
    getDetailsOrder();
  }, [params]);

  return (
    <Page title="Dashboard: Oder">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders Details
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead order={'asc'} headLabel={TABLE_HEAD} />
                <TableBody>
                  {detailsOrder &&
                    detailsOrder.orderItems.map((item, index) => {
                      const { image, name, price, qty } = item;
                      return (
                        <TableRow key={index}>
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{price}</TableCell>
                          <TableCell>{qty}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Grid>
        <Stack direction="row" alignItems="start" flexDirection="row" justifyContent="space-between" mt={5}>
          <Stack
            direction="row"
            alignItems="start"
            flexDirection="column"
            justifyContent="space-between"
            mt={5}
            width="60%"
          >
            <Typography variant="h4" gutterBottom>
              Shipping Address:
            </Typography>
            <Typography variant="h6" gutterBottom>
              {detailsOrder &&
                `${detailsOrder?.shippingAddress?.address},
              ${detailsOrder?.shippingAddress?.city},
              ${detailsOrder?.shippingAddress?.country}`}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="start"
            flexDirection="column"
            justifyContent="space-between"
            mt={5}
            width="40%"
          >
            <Typography variant="h4" gutterBottom>
              Payment:
            </Typography>
            <Typography variant="h6" gutterBottom>
              {`Method: ${detailsOrder?.paymentMethod}`}
              <br />
              {`Shipping Price: $${detailsOrder?.shippingPrice}`}
              <br />
              {`Tax Price: $${detailsOrder?.taxPrice}`}
              <br />
              {`Total Price: $${detailsOrder?.totalPrice}`} {/* {`Paid: ${detailsOrder?.isPaid ? ${}}`} */}
              <br />
              {`Paid: ${detailsOrder?.isPaid ? moment(detailsOrder?.paidAt).calendar() : 'Not Paid'}`} <br />
              {`Delivered: ${detailsOrder?.isDelivered ? moment(detailsOrder?.deliveredAt).calendar() : 'Not Delivered'
                }`}{' '}
              <br />
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
};

export default DetailOrder;
