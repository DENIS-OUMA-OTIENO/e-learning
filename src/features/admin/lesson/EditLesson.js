import React from 'react'
import EditLessonForm from './EditLessonForm';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useGetLessonsQuery } from './lessonApiSlice';
import { useGetAdminsQuery } from '../adminApiSlice';

const EditLesson = () => {
    const { id } = useParams();
  const { userId } = useAuth();

  const { lesson } = useGetLessonsQuery("subjectList", {
    selectFromResult: ({ data }) => ({
      lesson: data?.entities[id],
    }),
  });
  const { data: admins, isSuccess } = useGetAdminsQuery();
  let content
  if(isSuccess && lesson) {
    const { ids } = admins;
    const filteredAdmin = ids.filter(id => id === userId).toString();
    if (filteredAdmin) content = <EditLessonForm lesson={lesson} key={lesson} />
  }
  return content

}


export default EditLesson