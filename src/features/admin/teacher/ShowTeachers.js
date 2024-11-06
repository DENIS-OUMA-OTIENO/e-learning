import React from "react";
import Teacher from "./Teacher";
import { useGetTeachersQuery } from "./teacherApiSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import useAuth from "../hooks/useAuth";
import { TableData } from "../../../components/styles/buttonStyles";

const ShowTeachers = () => {
  const {
    data: teachers,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetTeachersQuery();

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
  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  let filteredTeachers;
  if (isSuccess) {
    const { ids } = teachers;

    filteredTeachers = ids.filter(
      (teacherId) => teachers.entities[teacherId].school === userId
    );

    if (filteredTeachers.length > 0) {
      tableContent = filteredTeachers.map((teacherId) => (
        <Teacher key={teacherId} teacherId={teacherId} />
      ));
    }
  }

  if (tableContent) {
    content = (
      <React.Fragment>
        <Table size="small">
          <TableHead sx={{ background: "#080a43" }}>
            <TableRow>
              <TableData>TSC NUMBER</TableData>
              <TableData>NAME</TableData>
              <TableData>GENDER</TableData>
              <TableData>CLASSES</TableData>
              <TableData>SUBJECTS</TableData>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </React.Fragment>
    );
  } else if (!isLoading) {
    content = <p style={{ padding: "16px" }}>No teachers found</p>;
  }

  return content;
};

export default ShowTeachers;
