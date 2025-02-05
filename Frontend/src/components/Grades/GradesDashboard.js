import React from "react";
import { Box, Grid, Card, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import ReactApexChart from "react-apexcharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend, ResponsiveContainer } from "recharts";
import "./GradesDashboard.css";

const GradesDashboard = () => {
  const dataPieGrade = [
    { name: "Grade 1", value: 22.67, color: "#FFD700" },
    { name: "Grade 2", value: 25.33, color: "#FF4500" },
    { name: "Grade 3", value: 21.33, color: "#FFA500" },
    { name: "Grade 4", value: 16.0, color: "#FF6347" },
    { name: "Grade 5", value: 14.67, color: "#FF1493" },
  ];

  const dataPieYear = [
    { name: "2025", value: 50, color: "#8A2BE2" },
    { name: "2024", value: 30, color: "#20B2AA" },
    { name: "2023", value: 20, color: "#FF6347" },
    { name: "2022", value: 15, color: "#FFD700" },
    { name: "2021", value: 25, color: "#FF4500" },
  ];
  

  const dataLinePerformance = [
    { month: "Jan", score: 84 },
    { month: "Feb", score: 87 },
    { month: "Mar", score: 85 },
    { month: "Apr", score: 88 },
    { month: "May", score: 83 },
    { month: "Jun", score: 86 },
  ];

  const dataAreaChart = {
    series: [
      {
        name: "Total Hours Spent",
        data: [40, 45, 42, 48, 44, 50],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  };

  // Average subject scores
  const subjectScores = [
    { subject: "English", score: 84.76 },
    { subject: "Tamil", score: 85.76 },
    { subject: "Maths", score: 89.67 },
    { subject: "Science", score: 90.78 },
    { subject: "Social", score: 92.54 },
  ];

  // Data for Examination Results by Subjects (Pass, Fail, Not Attended)
  const examinationResults = [
    { subject: "English", pass: 270, fail: 23, notAttended: 7 },
    { subject: "Tamil", pass: 260, fail: 30, notAttended: 10 },
    { subject: "Maths", pass: 220, fail: 50, notAttended: 30 },
    { subject: "Science", pass: 250, fail: 42, notAttended: 8 },
    { subject: "Social", pass: 265, fail: 30, notAttended: 5 },
  ];

  return (
    <Box className="dashboard-container">
      <Grid container spacing={3} py={4}>
        {/* Overview Cards */}
        <Grid item xs={12} md={3}>
          <Card className="card-centered">
            <Typography variant="h6">Students</Typography>
            <Typography variant="h4">300</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="card-centered">
            <Typography variant="h6">Avg. Attendance</Typography>
            <Typography variant="h4">88%</Typography>
          </Card>
        </Grid>
        
        {/* Pass and Fail Boxes */}
        <Grid item xs={12} md={3}>
          <Card className="card-centered">
            <Typography variant="h6">Pass</Typography>
            <Typography variant="h4">250</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="card-centered">
            <Typography variant="h6">Fail</Typography>
            <Typography variant="h4">50</Typography>
          </Card>
        </Grid>

        {/* Avg. Subject Score Table in Columns */}
        <Grid item xs={11} md={12} px={0}>
        <Card className="card-padding">
          <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>
            <center>Avg. Subject Score</center>
          </Typography>
          <TableContainer style={{ maxHeight: '220px', overflowY: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {subjectScores.map((item, index) => (
                    <TableCell
                      key={index}
                      style={{
                        backgroundColor: "transparent",
                        padding: '9px',
                        border: '1px solid #ddd',
                        textAlign: 'center', // Center text in header
                      }}
                    >
                      {item.subject}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {subjectScores.map((item, index) => (
                    <TableCell
                      key={index}
                      style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        textAlign: 'center', // Center text in body
                      }}
                    >
                      {item.score}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

        {/* Pie Charts in a single Box */}
        <Grid item xs={12} md={6}>
          <Card className="card-padding">
            <Typography variant="h6" gutterBottom>
              <center>Students by Grade and Year</center>
            </Typography>
            <Grid container spacing={3}>
              {/* Students by Grade Pie Chart */}
              <Grid item xs={12} md={6}>
                <PieChart width={300} height={200}>
                  <Pie
                    data={dataPieGrade}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {dataPieGrade.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <Typography variant="body2" align="center">
                  Students by Grade
                </Typography>
              </Grid>

              {/* Students by Year Pie Chart */}
              <Grid item xs={12} md={6}>
                <PieChart width={300} height={200}>
                  <Pie
                    data={dataPieYear}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {dataPieYear.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <Typography variant="body2" align="center">
                  Students by Year
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Monthly Performance Line Chart */}
        <Grid item xs={12} md={6}>
          <Card className="card-padding">
            <Typography variant="h6"><center>Monthly Performance</center></Typography>
            <ReactApexChart
              options={{
                chart: {
                  id: "performance-line",
                  type: "line",
                },
                xaxis: {
                  categories: dataLinePerformance.map((data) => data.month),
                },
                stroke: {
                  curve: "smooth",
                },
                tooltip: {
                  shared: true,
                },
              }}
              series={[{ name: "Score", data: dataLinePerformance.map((data) => data.score) }]}
              type="line"
              height={205}
            />
          </Card>
        </Grid>

        {/* Total Hours Spent - Area Chart */}
        <Grid item xs={12} md={6} py={2}>
          <Card className="card-padding">
            <Typography variant="h6"><center>Total Hours Spent per Week</center></Typography>
            <ReactApexChart
              options={dataAreaChart.options}
              series={dataAreaChart.series}
              type="area"
              height={285}
            />
          </Card>
        </Grid>

        {/* Examination Results by Subjects Bar Chart */}
        <Grid item xs={12} md={6} py={2}>
  <Card className="card-padding">
    <Typography variant="h6">
      <center>Examination Results by Subjects</center>
    </Typography>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={examinationResults}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis domain={[0, 300]} />  {/* Set Y-axis to go from 0 to 300 */}
        <Bar dataKey="pass" fill="#4CAF50" />
        <Bar dataKey="fail" fill="#FF6347" />
        <Bar dataKey="notAttended" fill="#FF9800" />
        <BarTooltip />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  </Card>
</Grid>

      </Grid>
    </Box>
  );
};

export default GradesDashboard;
