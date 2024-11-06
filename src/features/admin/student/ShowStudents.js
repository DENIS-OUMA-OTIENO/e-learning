import React from "react";
import { useGetStudentsQuery } from "./studentApiSlice";
import Student from "./Student";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useAuth from "../hooks/useAuth";
import { TableData } from "../../../components/styles/buttonStyles";
import Skeleton from "@mui/material/Skeleton";

const ShowStudents = () => {
  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery();

  const { userId } = useAuth();

  let content;
  let tableContent;

  if (isLoading) {
    tableContent = Array.from(new Array(5)).map((_, index) => (
      <TableRow key={index}>
        <TableData>
          <Skeleton variant="text" />
        </TableData>
        <TableData>
          <Skeleton variant="text" />
        </TableData>
        <TableData>
          <Skeleton variant="text" />
        </TableData>
        <TableData>
          <Skeleton variant="text" />
        </TableData>
        <TableData>
          <Skeleton variant="text" />
        </TableData>
      </TableRow>
    ));
  }
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const { ids } = students;

    const filteredStudents = ids.filter(
      (studentId) => students.entities[studentId].school === userId
    );

    if (filteredStudents.length > 0) {
      tableContent = filteredStudents.map((studentId) => (
        <Student key={studentId} studentId={studentId} />
      ));
    }
  }

  if (tableContent) {
    content = (
      <React.Fragment>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#080a43" }}>
            <TableRow>
              <TableData>ADM NO</TableData>
              <TableData>NAME</TableData>
              <TableData>GENDER</TableData>
              <TableData>CLASS</TableData>
              <TableData align="right">ACTIONS</TableData>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </React.Fragment>
    );
  } else if (!isLoading) {
    content = <p style={{ padding: "16px" }}>No students found</p>;
  }

  return content;
};

export default ShowStudents;
