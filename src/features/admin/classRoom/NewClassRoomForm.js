import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddNewClassroomMutation } from "./classRoomApiSlice";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const NewClassRoomForm = () => {
  const [addNewClassroom, { isLoading, isSuccess, isError, error }] =
    useAddNewClassroomMutation();

  const { userId } = useAuth();
  const school = userId;
  console.log("school: ", userId);

  const navigate = useNavigate();

  const [className, setClassName] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setClassName("");
      navigate("/dash/classrooms");
    }
  }, [isSuccess, navigate]);

  const onClassNameChange = (e) => setClassName(e.target.value);

  const canSave = className && school && !isLoading;

  const onClassroomSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewClassroom({ className, school });
    }
  };

  let content;
  if (isError) content = <p>{error?.data?.message}</p>;

  content = (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        New Classroom
      </Typography>
      <FormControl fullWidth>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="className"
              label="className"
              placeholder="Enter classroom name"
              value={className}
              onChange={onClassNameChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!canSave}
            onClick={onClassroomSaveClicked}
          >
            Create
          </Button>
        </Box>
      </FormControl>
      {isError && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error?.data?.message}
        </Typography>
      )}
    </Box>
  );

  return content;
};

export default NewClassRoomForm;
