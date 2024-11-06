import React from "react";
import { useGetSubjectsQuery } from "../subject/subjectApiSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SubjectLesson from "./SubjectLesson";
import { useParams } from "react-router-dom";
import { useGetClassRoomsQuery } from "../classRoom/classRoomApiSlice";
import { TableData } from "../../../components/styles/buttonStyles";
import Skeleton from "@mui/material/Skeleton";

const ShowSubjectLesson = () => {
  const {
    data: subjects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubjectsQuery();

  const { className } = useParams();
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

  const { classroomId } = useGetClassRoomsQuery("classroomsList", {
    selectFromResult: ({ data }) => ({
      classroomId: data?.ids.filter((id) => {
        let currentClassroomId;
        if (data?.entities[id]?.className === className) {
          currentClassroomId = id;
        }
        return currentClassroomId;
      }),
    }),
  });
  const formattedClassroomId = classroomId?.toString();

  if (isSuccess) {
    const { ids } = subjects;

    const filteredSubjects = ids.filter(
      (subjectId) =>
        subjects.entities[subjectId].classroom === formattedClassroomId
    );

    if (filteredSubjects.length > 0) {
      tableContent = filteredSubjects.map((subjectId) => {
        content = <SubjectLesson key={subjectId} subjectId={subjectId} />;

        return content;
      });
    }
  }

  if (tableContent) {
    content = (
      <React.Fragment>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#080a43" }}>
            <TableRow>
              <TableData>NAME</TableData>
              <TableData align="right">ACTIONS</TableData>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </React.Fragment>
    );
  } else if (!isLoading) {
    content = <p style={{ padding: "16px" }}>No class subjects found</p>;
  }

  return content;
};

export default ShowSubjectLesson;
