import React from "react";
import { useParams } from "react-router-dom";
import { useGetSubjectsQuery } from "./subjectApiSlice";
import EditSubjectForm from "./EditSubjectForm";
import { useGetAdminsQuery } from "../adminApiSlice";
import useAuth from "../hooks/useAuth";

const EditSubject = () => {
  const { id } = useParams();
  const { userId } = useAuth();

  const { subject } = useGetSubjectsQuery("subjectList", {
    selectFromResult: ({ data }) => ({
      subject: data?.entities[id],
    }),
  });
  const { data: admins, isSuccess } = useGetAdminsQuery();
  let content;
  if (isSuccess && subject) {
    const { ids } = admins;
    const filteredAdmin = ids.filter((id) => id === userId);
    if (filteredAdmin.length > 0)
      content = filteredAdmin.map((adminId) => (
        <EditSubjectForm subject={subject} key={subject} adminId={adminId} />
      ));
  }
  return content;
};

export default EditSubject;
