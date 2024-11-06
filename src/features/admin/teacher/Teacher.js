import { useSelector } from "react-redux";
import { selectTeacherById } from "./teacherApiSlice";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useGetSubjectsQuery } from "../subject/subjectApiSlice";
import { useGetClassRoomsQuery } from "../classRoom/classRoomApiSlice";

const Teacher = ({ teacherId }) => {
  const teacher = useSelector((state) => selectTeacherById(state, teacherId));
  const { data: subjects, isSuccess: isSubjectSuccess } = useGetSubjectsQuery();
  const { data: classrooms, isSuccess: isClassroomSuccess } = useGetClassRoomsQuery();

  // let subjectIds;
  // let subjectTaught;
  // if (isSubjectSuccess) {
  //   const { ids } = subjects;
  //   subjectIds = ids;

  //   const filteredSubjects = subjectIds.filter(id => subjects.entities[id].teacher === teacherId )
  //   subjectIds = filteredSubjects
  //   if(filteredSubjects.length > 0) subjectTaught = filteredSubjects.map(id => subjects.entities[id].subjectName)
    
  // }

  // let classroomId;
  // if (isClassroomSuccess) {
  //   classroomId = subjectIds?.map((id) => {
  //     let classroomName;
  //     if (subjects.entities[id].teacher === teacherId) {
  //       classroomName = subjects.entities[id].classroom;
  //     }
  //     return classroomName;
  //   });
  // }

  // let classroomTaught;
  // if (isClassroomSuccess) {
  //   const { ids } = classrooms;
  //   classroomTaught = classroomId?.map((classSubjectId) => {
  //     let classroomName;
  //     ids.map((id) => {
  //       if (classSubjectId === id) {
  //         classroomName = classrooms.entities[id].className;
  //       }
  //       return classroomName;
  //     });
  //     return classroomName;
  //   });
  // }

    // Filter and map subjects taught by this teacher
  const getSubjectsTaught = () => {
    if (!isSubjectSuccess) return [];
    return subjects.ids
      .filter((id) => subjects.entities[id].teacher === teacherId)
      .map((id) => subjects.entities[id].subjectName);
  };

  // Get classrooms corresponding to the subjects taught by this teacher
  const getClassroomsTaught = () => {
    if (!isClassroomSuccess || !isSubjectSuccess) return [];
    return subjects.ids 
      
      .filter((id) => subjects.entities[id].teacher === teacherId)
      .map((id) => {
        const subjectClassroomId = subjects.entities[id].classroom;
        return classrooms.entities[subjectClassroomId]?.className || '';
      });
  };

  const subjectTaught = getSubjectsTaught();
  const classroomTaught = getClassroomsTaught();

  if (!teacher) return null;

  const formattedText = (text) => {

    return text ? text.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    : ''
  }

  let content;
  if (teacher) {
    content = (
      <TableRow>
        <TableCell>{formattedText(teacher.teacherNumber)}</TableCell>
        <TableCell>{formattedText(teacher.teacherName)}</TableCell>
        <TableCell>{formattedText(teacher.gender)}</TableCell>
        <TableCell>
          {classroomTaught?.map((classroom, index) => (
            <div key={index}>{formattedText(classroom)}</div>
          ))}
        </TableCell>
        <TableCell>
          {subjectTaught?.map((subject, index) => (
            <div key={index}>{formattedText(subject)}</div>
          ))}
        </TableCell>
      </TableRow>
    );
  }
  return content;
};

export default Teacher;
