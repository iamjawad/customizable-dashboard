import React, { useState } from 'react';
import './App.css';
import { AppBar, Avatar, Box, Button, Card, CardContent, CardHeader, Container, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MenuIcon from '@mui/icons-material/Menu';
import AutoGraph from '@mui/icons-material/AutoGraph';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Area, AreaChart, BarChart, Bar } from 'recharts';
import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import styled from '@emotion/styled';
import 'react-grid-layout/css/styles.css'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: any) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const randomLineChartData = () => {

  const data = [];

  for (let index = 0; index < 8; index++) {
    data.push({
      name: 'Page G',
      uv: Math.random() * 1000,
      pv: Math.random() * 1200,
      amt: 2100,
    });
  }

  return data;
}

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const charTypeList = ["Returns", "Cancelations", "Weekly", "Monthly"];

const ResponsiveGridLayout = WidthProvider(Responsive);

const ItemWrapper = styled(Card)`
display: block;
  background-color: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px dashed gray;
`;

function App() {

  const [layout, setLayout] = useState({
    lg: [
      { i: "a", x: 0, y: 1, w: 2, h: 5 },
      { i: "b", x: 2, y: 1, w: 2, h: 5 },
      { i: "c", x: 4, y: 1, w: 2, h: 5 }
    ]
  });

  const getID = () => {
    return Date.now().toString();
  }

  const addChart = () => {
    const newLayout = { ...layout };
    const lgLastElement = newLayout.lg[newLayout.lg.length - 1];
    const chartID = getID();
    newLayout.lg.push({ i: chartID, x: newLayout.lg.length % 6 == 0 ? 0 : lgLastElement.x + 2, y: newLayout.lg.length % 6 == 0 ? lgLastElement.y + 2 : lgLastElement.y, w: 2, h: 5 });

    const newChartTypes = [...chartTypes];
    const randomIndex = Math.round(Math.random()) * charTypeList.length;
    const randomIndexString = charTypeList[randomIndex == 0 ? 0 : randomIndex - 1];
    newChartTypes.push({ id: chartID, label: randomIndexString });
    setLayout(newLayout);
    setChartTypes(newChartTypes);
  }

  const [chartTypes, setChartTypes] = useState([{ id: "a", label: "Revenue Today" }, { id: "b", label: "Revenue Past 7 Days" }, { id: "c", label: "Sales" }]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <AutoGraph style={{ marginRight: "5px", color: "#fead00" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Customizable Dashboard
            </Typography>
            <Button onClick={addChart} variant="contained">Add Graph</Button>
          </Toolbar>
        </AppBar>
        <ResponsiveGridLayout
          className="layout"
          rowHeight={25}
          layouts={layout}
          width={1200}
          autoSize={true}
          verticalCompact={true}
          preventCollision={false}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
          margin={{
            lg: [10, 10],
            md: [10, 10],
            sm: [10, 10],
            xs: [10, 10],
            xxs: [10, 10],
          }}
        >
          {chartTypes.map((item, index) =>
            <ItemWrapper key={item.id} variant="elevation" elevation={2} data-grid={{
              x: layout.lg.find((i: any) => i.i == item.id)?.x,
              y: layout.lg.find((i: any) => i.i == item.id)?.y,
              w: layout.lg.find((i: any) => i.i == item.id)?.w,
              h: layout.lg.find((i: any) => i.i == item.id)?.h,
              i: layout.lg.find((i: any) => i.i == item.id)?.i,
              minW: 2,
              maxW: Infinity,
              minH: 2,
              maxH: Infinity,
              isDraggable: true,
              isResizable: true
            }}>
              <CardContent>
                <Typography variant="subtitle2">
                  <strong>{item.label}</strong>
                </Typography>
                <div style={{ height: 90, width: '100%' }}>

                  <Typography variant="h5" style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <strong>{Math.round(Math.random() * 100)}</strong>
                  </Typography>
                  <ResponsiveContainer>
                    <LineChart width={300} height={100} data={randomLineChartData()}>
                      <Line type="monotone" dataKey="pv" stroke={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </ItemWrapper>
          )}
          <Card style={{ border: "1px dashed gray" }} key="rev" data-grid={{
            x: 0,
            y: 2,
            w: 6,
            h: 10
          }}>
            <CardContent>
              <Typography variant="h6">
                <strong>Revenue Today</strong>
              </Typography>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
          <ItemWrapper key="rir" data-grid={{
            x: 6,
            y: 3,
            w: 6,
            h: 10
          }}>
            <CardContent>
              <Typography variant="subtitle2">
                <strong>Revenue Past 7 Days</strong>
              </Typography>
              <div style={{ height: 300, width: '100%' }}>
                <Typography variant="h5" style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <strong>41%</strong>
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="value"
                      startAngle={180}
                      endAngle={0}
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </ItemWrapper>
          <ItemWrapper key="rird" data-grid={{
            x: 0,
            y: 3,
            w: 6,
            h: 10
          }}>
            <CardContent>
              <Typography variant="subtitle2">
                <strong>Sales Past 7 Days</strong>
              </Typography>
              <div style={{ height: 300, width: '100%' }}>
                <Typography variant="h5" style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <strong>41%</strong>
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={400}
                    data={randomLineChartData()}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </ItemWrapper>
          <ItemWrapper key="rirda" data-grid={{
            x: 6,
            y: 3,
            w: 6,
            h: 10
          }}>
            <CardContent>
              <Typography variant="subtitle2">
                <strong>Monthly Report</strong>
              </Typography>
              <div style={{ height: 300, width: '100%' }}>
                <Typography variant="h5" style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <strong>41%</strong>
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart width={150} height={40} data={randomLineChartData()}>
                    <Bar dataKey="uv" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </ItemWrapper>
        </ResponsiveGridLayout>

      </Box>

    </div>
  );
}

export default App;
