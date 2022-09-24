import { faker } from '@faker-js/faker';
// @mui
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import OrderApi from '../fecthApi/OrderApi';
// components
import Page from '../components/Page';
// sections
import { AppNewsUpdate, AppOrderTimeline, AppWebsiteVisits, AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await OrderApi.turnover();
      setOrders(data);
    };
    fetchOrder();
  }, []);

  let totalPrice = 0;
  let totalOrder = 0;
  let arrayMonth = [];
  if (orders) {
    totalPrice = orders.turnoverMonth.reduce((acc, item) => acc + item.total, 0);
    totalOrder = orders.turnoverMonth.length;
    arrayMonth = orders.turnoverMonth.map((order) => String(order._id));
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Sales" total={totalPrice} icon={'ant-design:money-collect-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Orders" total={totalOrder} color="info" icon={'ant-design:wallet-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Products"
              total={1723315}
              color="warning"
              icon={'ant-design:shopping-filled'}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Turnover Statics"
              chartLabels={arrayMonth}
              chartData={[
                {
                  name: 'Month',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
