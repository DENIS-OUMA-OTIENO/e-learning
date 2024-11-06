import React from "react";
import { useGetClassRoomsQuery } from "./classRoomApiSlice";
import ClassRoom from "./ClassRoom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import useAuth from "../hooks/useAuth";
import { TableData } from "../../../components/styles/buttonStyles";
import Skeleton from "@mui/material/Skeleton";

const ShowClassRooms = () => {
  const {
    data: classRooms,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClassRoomsQuery();

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
    const { ids } = classRooms;

    const filteredClassrooms = ids.filter(
      (classroomId) => classRooms.entities[classroomId].school === userId
    );

    if (filteredClassrooms.length > 0) {
      tableContent = filteredClassrooms.map((classroomId) => (
        <ClassRoom key={classroomId} classRoomId={classroomId} />
      ));
    }
  }
  if (tableContent) {
    content = (
      <React.Fragment>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#080a43" }}>
            <TableRow>
              <TableData>CLASS</TableData>
              <TableData align="right">ACTIONS</TableData>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
        {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
      </React.Fragment>
    );
  } else if (!isLoading) {
    content = <p style={{ padding: "16px" }}>No classes found</p>;
  }

  return content;
};

export default ShowClassRooms;
