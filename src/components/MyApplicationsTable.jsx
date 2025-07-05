import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
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
import DialogBox from "./DialogBox";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ButtonGroup from "@mui/material/ButtonGroup";

function Row({ row, fetchApplications }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/my-applications/${row.application_id}`);
  };

  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDialogTitle(<QuestionMarkIcon />);
    setDialogMessage("Are you sure you want to delete this application?");
    setIsConfirmDialog(true);
    setOpenDialog(true);
  };

  const handleApplicationDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(
        `http://localhost:3000/my-applications/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("There was a problem deleting the application!");
      }

      const result = await response.json();

      setOpenDialog(false);

      setTimeout(() => {
        setDialogTitle(<CheckCircleOutlineIcon />);
        setDialogMessage(result.message);
      }, 200);

      setDeleteId(null);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete the application.");
      setOpenDialog(false);
    }
  };

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
                row.status === "applied"
                  ? "applied"
                  : row.status === "interviewing"
                  ? "interviewing"
                  : row.status === "offer"
                  ? "offer"
                  : row.status === "rejected"
                  ? "rejected"
                  : row.status === "ghosted"
                  ? "ghosted"
                  : "withdrawn"
              }
              sx={{ backgroundColor: "inherit" }}
            />
            <Typography>{row.status}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Tooltip title="Edit">
            <IconButton onClick={handleEditClick}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => confirmDelete(row.application_id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
                      {row.notes &&
                        row.notes.split("\n").map((line, index) => (
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

      <DialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        title={dialogTitle}
        message={dialogMessage}
        buttons={
          isConfirmDialog
            ? [
                {
                  text: "OK",
                  onClick: handleApplicationDelete,
                  variant: "contained",
                },
                {
                  text: "Cancel",
                  onClick: () => setOpenDialog(false),
                  variant: "outlined",
                  bgColor: "black",
                  textColor: "white",
                },
              ]
            : [
                {
                  text: "Close",
                  onClick: () => setOpenDialog(false),
                  variant: "outlined",
                  bgColor: "black",
                  textColor: "white",
                },
              ]
        }
      />
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

  const [sortColumn, setSortColumn] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:3000/my-applications?user_id=${user.user_id}&search=${searchInput}&sort=${sortColumn}&order=${sortOrder}&status=${statusFilter}`
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

  useEffect(() => {
    const timeoutId = setTimeout(fetchApplications, 200);
    return () => clearTimeout(timeoutId);
  }, [user, searchInput, sortColumn, sortOrder, statusFilter]);

  const handleSort = (column) => {
    const newOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="job applications">
        <TableHead>
          <TableRow>
            <TableCell />

            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Position</Typography>
                <IconButton
                  sx={{ padding: 0.1 }}
                  onClick={() => handleSort("position_name")}
                >
                  {sortColumn === "position_name" && sortOrder === "asc" ? (
                    <ArrowDropUpIcon fontSize="medium" />
                  ) : (
                    <ArrowDropDownIcon fontSize="medium" />
                  )}
                </IconButton>
              </Box>
            </TableCell>

            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Employer</Typography>
                <IconButton
                  sx={{ padding: 0.1 }}
                  onClick={() => handleSort("employer_name")}
                >
                  {sortColumn === "employer_name" && sortOrder === "asc" ? (
                    <ArrowDropUpIcon fontSize="medium" />
                  ) : (
                    <ArrowDropDownIcon fontSize="medium" />
                  )}
                </IconButton>
              </Box>
            </TableCell>

            <TableCell sx={{ whiteSpace: "nowrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Created at</Typography>
                <IconButton
                  sx={{ padding: 0.1 }}
                  onClick={() => handleSort("created_at")}
                >
                  {sortColumn === "created_at" && sortOrder === "asc" ? (
                    <ArrowDropUpIcon fontSize="medium" />
                  ) : (
                    <ArrowDropDownIcon fontSize="medium" />
                  )}
                </IconButton>
              </Box>
            </TableCell>

            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Status</Typography>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  size="small"
                  sx={{ minWidth: 120, height: 32 }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="interviewing">Interviewing</MenuItem>
                  <MenuItem value="offer">Offer</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="ghosted">Ghosted</MenuItem>
                  <MenuItem value="withdrawn">Withdrawn</MenuItem>
                </Select>
              </Box>
            </TableCell>

            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {applications.length > 0 ? (
            applications.map((row) => (
              <Row
                key={row.application_id}
                row={row}
                fetchApplications={fetchApplications}
              />
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
