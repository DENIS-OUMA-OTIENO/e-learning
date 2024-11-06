import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSubjectById } from "../subject/subjectApiSlice";
import { useAddNewLessonMutation } from "./lessonApiSlice";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useGetTeachersQuery } from "../teacher/teacherApiSlice";

const NewLessonForm = ({ subjectId }) => {
  const lessonSubject = useSelector((state) =>
    selectSubjectById(state, subjectId)
  );

  const school = lessonSubject.school;
  const classroom = lessonSubject.classroom;
  const subject = subjectId;
  console.log("school Id: ", school);
  console.log("subjectClass Id: ", classroom);
  console.log("lessonSubject Id: ", subject);

  const [addNewLesson, { isLoading, isError, error }] =
    useAddNewLessonMutation();

  const { data: teachers, isSuccess: isTeacherSuccess } = useGetTeachersQuery();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [video, setVideo] = useState("");
  const [date, setDate] = useState("");
  const [teacher, setTeacher] = useState("");

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
        await addNewLesson({
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
        navigate("/dash/lessons");
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
          Upload notes
        </Button>
      </Box>
    </Box>
  );

  return content;
};

export default NewLessonForm;
