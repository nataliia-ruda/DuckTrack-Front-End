import React, { useEffect, useState, useContext } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import AuthContext from '../core/AuthContext';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Charts = () => {
  const { user } = useContext(AuthContext); 
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (!user) return;

    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:3000/my-applications?user_id=${user.user_id}`);
        if (!response.ok) throw new Error("Failed to fetch applications");

        const data = await response.json();
        setApplications(data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading) return <p>Loading charts...</p>;
  if (!applications.length) return <p>No applications found.</p>;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); 


  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); 

  const applicationsPerDay = Array(daysInMonth).fill(0); 

  applications.forEach((app) => {
    const appDate = new Date(app.created_at);
    if (appDate.getFullYear() === currentYear && appDate.getMonth() === currentMonth) {
      const dayIndex = appDate.getDate() - 1; 
      applicationsPerDay[dayIndex] += 1;
    }
  });


  const dateLabels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

 
  const applicationsByStatus = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusLabels = Object.keys(applicationsByStatus);
  const statusCounts = statusLabels.map((status) => applicationsByStatus[status]);

  const statusColors = {
    "waiting for response": "#FFC107", 
    "interview": "#43A047",
    "rejected": "#E53935", 
    "other": "#4BC0C0", 
  };

 
  const doughnutColors = statusLabels.map(status => statusColors[status] || "#4BC0C0"); 
  return (
    <div>
      <h2 >Job Applications Analytics</h2>

     
      <div style={{ width: "80%",/*  maxWidth: "600px", */ height: "250px", margin: "20px" }}>
        <h3>Current Month Application Activity</h3>
        <Line
          data={{
            labels: dateLabels, 
            datasets: [
              {
                label: "Applications per Day",
                data: applicationsPerDay,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false, 
            scales: {
              x: {
                ticks: {
                  autoSkip: false, 
                },
              },
              y: {
                beginAtZero: true,
                max: 15, 
              },
            },
          }}
        />
      </div>

      
      <div style={{ width: "50%",  height: "300px", margin: "auto", marginTop: "4rem" }}>
        <h3 style={{textAlign: "center", marginBottom: "20px"}}>Application Status Report
        </h3>
        <Doughnut
          data={{
            labels: statusLabels,
            datasets: [
              {
                label: "Applications by Status",
                data: statusCounts,
                backgroundColor: doughnutColors,
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom", 
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Charts;