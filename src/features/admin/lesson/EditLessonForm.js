import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetTeachersQuery } from "../teacher/teacherApiSlice";
import useAuth from "../hooks/useAuth";
import { useUpdateLessonMutation } from "./lessonApiSlice";
import { useGetClassRoomsQuery } from "../classRoom/classRoomApiSlice";
import { useGetSubjectsQuery } from "../subject/subjectApiSlice";

const EditLessonForm = ({ lesson }) => {
  const { id } = useParams();
  const { userId } = useAuth();
  const school = userId;
  const classroom = lesson.classroom;
  const subject = lesson.subject;

  const [updateLesson, { isLoading, isError, error }] = useUpdateLessonMutation();

  const { data: teachers, isSuccess: isTeacherSuccess } = useGetTeachersQuery();
  const { currentClassroom } = useGetClassRoomsQuery('classroomList', {
    selectFromResult: ({ data }) => ({
        currentClassroom: data?.entities[classroom].className
    })
  })
  const { currentSubject } = useGetSubjectsQuery('subjectList', {
    selectFromResult: ({ data }) => ({
        currentSubject: data?.entities[subject].subjectName
    })
  })


  const navigate = useNavigate();

  const [title, setTitle] = useState(lesson.title);
  const [text, setText] = useState(lesson.text);
  const [video, setVideo] = useState(lesson.video);
  const [date, setDate] = useState(lesson.date);
  const [teacher, setTeacher] = useState(lesson.teacher);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onVideoChange = (e) => setVideo(e.target.value);
  const onDateChange = (e) => setDate(e.target.value);
  const onTeacherChange = (e) => setTeacher(e.target.value);

  const canSave =
    title &&
    text &&
    date &&
    classroom &&
    subject &&
    teacher &&
    school &&
    !isLoading;

  const onNoteSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await updateLesson({
          id,
          title,
          text,
          date,
          teacher,
          video,
          subject,
          classroom,
          school,
        }).unwrap();
        setTitle("");
        setText("");
        setDate("");
        setTeacher("");
        navigate(`/dash/lessons/${currentClassroom}/${currentSubject}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  let teachersOptions;
  if (isTeacherSuccess) {
    teachersOptions = teachers.ids.map((id) => (
      <MenuItem key={id} value={id}>
        {teachers.entities[id].teacherName}
      </MenuItem>
    ));
  }

  let content;
  if (isError) content = <p>{error?.data?.message}</p>;

  content = (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onNoteSaveClicked}
      sx={{ maxWidth: "600px", margin: "0 auto", p: 2, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        New Lesson
      </Typography>

      {isError && <Typography color="error">{error?.data?.message}</Typography>}

      <FormControl fullWidth margin="normal">
        <FormLabel>Topic</FormLabel>
        <TextField
          id="title"
          name="title"
          placeholder="Lesson number: lesson topic"
          value={title}
          onChange={onTitleChange}
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Lesson Content</FormLabel>
        <TextField
          id="text"
          name="text"
          placeholder="Enter lesson content"
          value={text}
          onChange={onTextChange}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Lesson Date</FormLabel>
        <TextField
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={onDateChange}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Subject Teacher</FormLabel>
        <Select
          id="teacher"
          name="teacher"
          value={teacher}
          onChange={onTeacherChange}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">
            <em>Select teacher</em>
          </MenuItem>
          {teachersOptions}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Video Link</FormLabel>
        <TextField
          id="video"
          name="video"
          placeholder="https://www.youtube.com"
          value={video}
          onChange={onVideoChange}
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!canSave}
        >
          Update notes
        </Button>
      </Box>
    </Box>
  );

  return content;
};

export default EditLessonForm;
