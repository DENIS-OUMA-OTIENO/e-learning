import { useSelector } from "react-redux";
import { selectClassRoomById } from "./classRoomApiSlice";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../../../components/styles/buttonStyles";

const ClassRoom = ({ classRoomId }) => {
  const classRoom = useSelector((state) =>
    selectClassRoomById(state, classRoomId)
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const formattedText = (text) => {
    return text
      ? text
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ")
      : "";
  };

  let actions;
  if (pathname === "/dash/subjects/new") {
    actions = (
      <BlueButton onClick={() => navigate(`/dash/subjects/new/${classRoomId}`)}>
        Choose
      </BlueButton>
    );
  } else if (pathname === "/dash/lessons/new") {
    actions = (
      <BlueButton
        onClick={() => navigate(`/dash/lessons/new/${classRoom.className}`)}
      >
        Choose
      </BlueButton>
    );
  } else if (pathname === "/dash/students/new") {
    actions = (
      <BlueButton onClick={() => navigate(`/dash/students/new/${classRoomId}`)}>
        Choose
      </BlueButton>
    );
  } else if (pathname === "/dash/lessons") {
    actions = (
      <BlueButton onClick={() => navigate(`/dash/lessons/${classRoom.className}`)}>
        Choose
      </BlueButton>
    );
  } else {
    actions = "actions";
  }

  if (classRoom) {
    return (
      <TableRow>
        <TableCell>{formattedText(classRoom.className)}</TableCell>
        <TableCell align="right">{actions}</TableCell>
      </TableRow>
    );
  } else return null;
};

export default ClassRoom;
