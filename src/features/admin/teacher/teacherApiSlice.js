import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const teachersAdapter = createEntityAdapter({})

const initialState = teachersAdapter.getInitialState()

export const teacherApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTeachers: builder.query({
            query: () => ('/teacher'),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },

            transformResponse: responseData => {
                const loadedTeachers = responseData.map(teacher => {
                    teacher.id = teacher._id
                    return teacher
                })
                return teachersAdapter.setAll(initialState, loadedTeachers)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [{type: 'teacher', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'teacher', id}))
                    ]
                } else return [{type: 'teacher', id: 'LIST'}]
            }
        }),

        addNewTeacher: builder.mutation({
            query: initialTeacherData => ({
                url: '/teacher',
                method: 'POST',
                body: { ...initialTeacherData}
            }),
            invalidatesTags: [{ type: 'teacher', id: 'LIST'}]

        })
    })
})

export const { useGetTeachersQuery, useAddNewTeacherMutation } = teacherApiSlice

export const selectTeachersResult = teacherApiSlice.endpoints.getTeachers.select()

const selectTeacherData = createSelector(
    selectTeachersResult,
    teachersResult => teachersResult.data

)

export const {
    selectAll: selectAllTeachers,
    selectById: selectTeacherById,
    selectIds: selectTeacherIds
} 
= teachersAdapter.getSelectors(state => selectTeacherData(state) ?? initialState)