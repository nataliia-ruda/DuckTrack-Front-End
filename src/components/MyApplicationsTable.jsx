import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AuthContext from "../core/AuthContext";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import "../App.css";

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/my-applications/${row.application_id}`);
  };

  const handleApplicationDelete = () => {
    
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.position_name}</TableCell>
        <TableCell>{row.employer_name}</TableCell>

        <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>

        <TableCell sx={{ height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircleIcon
              fontSize="small"
              className={
                row.status === "waiting for response"
                  ? "waiting"
                  : row.status === "rejected"
                  ? "rejected"
                  : "interview"
              }
              sx={{ backgroundColor: "inherit" }}
            />
            <Typography>{row.status}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <IconButton onClick={handleEditClick}>
            <ModeEditIcon />
          </IconButton>

          <IconButton onClick={handleApplicationDelete}>
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Application Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  <TableRow>
                    <TableCell>Application date:</TableCell>
                    <TableCell>
                      {new Date(row.application_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Employment type:</TableCell>
                    <TableCell>{row.employment_type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Work mode:</TableCell>
                    <TableCell>{row.work_mode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Source:</TableCell>
                    <TableCell>{row.source}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Job description:</TableCell>
                    <TableCell>
                      {row.job_description.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </TableCell>
                  </TableRow>
                  {row.job_link && (
                    <TableRow>
                      <TableCell>Link:</TableCell>
                      <TableCell>
                        <a
                          href={row.job_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.job_link}
                        </a>
                      </TableCell>
                    </TableRow>
                  )} 
                   <TableRow>
                    <TableCell>Notes:</TableCell>
                    <TableCell>
                      {row.notes && row.notes.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    application_id: PropTypes.number.isRequired,
    position_name: PropTypes.string.isRequired,
    employer_name: PropTypes.string.isRequired,
    application_date: PropTypes.string.isRequired,
    employment_type: PropTypes.string,
    source: PropTypes.string,
    job_description: PropTypes.string,
    job_link: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    work_mode: PropTypes.string,
  }).isRequired,
};

export default function MyApplicationsTable({ searchInput }) {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/my-applications?user_id=${user.user_id}&search=${searchInput}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setApplications(data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      }
    };

    const timeoutId = setTimeout(fetchApplications, 200);
    return () => clearTimeout(timeoutId);
  }, [user, searchInput]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="job applications">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 700 }}>Position</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Employer</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Created at</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.length > 0 ? (
            applications.map((row) => (
              <Row key={row.application_id} row={row} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
