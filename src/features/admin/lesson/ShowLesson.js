import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGetLessonsQuery } from "./lessonApiSlice";
import Lesson from "./Lesson";
import useAuth from "../hooks/useAuth";
import { useGetStudentsQuery } from "../student/studentApiSlice";
import { useGetTeachersQuery } from "../teacher/teacherApiSlice";
import { useParams } from "react-router-dom";
import { useGetClassRoomsQuery } from "../classRoom/classRoomApiSlice";
import { useGetSubjectsQuery } from "../subject/subjectApiSlice";
import { TableData } from "../../../components/styles/buttonStyles";
import Skeleton from "@mui/material/Skeleton";

const ShowLesson = () => {
  const { userId } = useAuth();
  const { className, subjectName } = useParams();

  const {
    data: lessons,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLessonsQuery();

  const { studentSchoolId } = useGetStudentsQuery("studentsList", {
    selectFromResult: ({ data }) => ({
      studentSchoolId: data?.entities[userId]?.school,
    }),
  });

  const { teacherSchoolId } = useGetTeachersQuery("teachersList", {
    selectFromResult: ({ data }) => ({
      teacherSchoolId: data?.entities[userId]?.school,
    }),
  });

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

  const { subjectId } = useGetSubjectsQuery("subjectsList", {
    selectFromResult: ({ data }) => ({
      subjectId: data?.ids.filter((id) => {
        let currentSubjectId;
        if (
          data?.entities[id]?.subjectName === subjectName &&
          data?.entities[id]?.classroom === formattedClassroomId
        ) {
          currentSubjectId = id;
        }
        return currentSubjectId;
      }),
    }),
  });
  const formattedSubjectId = subjectId?.toString();

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

  let filteredLessons;
  if (isSuccess) {
    const { ids } = lessons;
    filteredLessons = ids.filter(
      (lessonId) =>
        (lessons.entities[lessonId].school === userId &&
          lessons.entities[lessonId].classroom === formattedClassroomId &&
          lessons.entities[lessonId].subject === formattedSubjectId) ||
        lessons.entities[lessonId].school === studentSchoolId ||
        lessons.entities[lessonId].school === teacherSchoolId
    );

    if (filteredLessons.length > 0) {
      tableContent = filteredLessons.map((lessonId) => (
        <Lesson key={lessonId} lessonId={lessonId} />
      ));
    }
  }

  if (tableContent) {
    content = (
      <React.Fragment>
        <Table size="small">
          <TableHead variant="head" sx={{ backgroundColor: "#080a43" }}>
            <TableRow>
              <TableData>SUBJECT</TableData>
              <TableData>TOPIC</TableData>
              <TableData>LESSON DATE</TableData>
              <TableData>SUBJECT TEACHER</TableData>
              <TableData>CREATED ON</TableData>
              <TableData align="right">ACTIONS</TableData>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </React.Fragment>
    );
  } else if (!isLoading) {
    content = <p style={{ padding: "16px" }}>No lessons found</p>;
  }

  return content;
};

export default ShowLesson;
