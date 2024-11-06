import React from "react";
import { useGetSubjectsQuery } from "./subjectApiSlice";
import Subject from "./Subject";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import useAuth from "../hooks/useAuth";
import { TableData } from "../../../components/styles/buttonStyles";
const ShowSubjects = () => {
  const {
    data: subjects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectsQuery();

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
    const { ids } = subjects;

    const filteredSubjects = ids.filter(
      (subjectId) => subjects.entities[subjectId].school === userId
    );

    if (filteredSubjects.length > 0) {
      tableContent = filteredSubjects.map((subjectId) => (
        <Subject key={subjectId} subjectId={subjectId} />
      ));
    }
  }

  if (tableContent) {
    content = (
      <React.Fragment>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#080a43" }}>
            <TableRow>
              <TableData>SUBJECT CODE</TableData>
              <TableData>NAME</TableData>
              <TableData>CLASS</TableData>
              <TableData>TEACHER</TableData>
              <TableData align="right">ACTIONS</TableData>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </React.Fragment>
    );
  } else if (!isLoading) {
    content = <p style={{ padding: "16px" }}>No subjects found</p>;
  }

  return content;
};
export default ShowSubjects;
