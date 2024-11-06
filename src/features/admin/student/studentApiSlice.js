import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const studentsAdapter = createEntityAdapter({})

const initialState = studentsAdapter.getInitialState()

export const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get all students api
        getStudents: builder.query({
            query: () => ('/student'),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            
            transformResponse: responseData => {
                const loadedStudents = responseData.map(student => {
                    student.id = student._id
                    return student
                })
                return studentsAdapter.setAll(initialState, loadedStudents)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return ([
                        {type: 'student', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'student', id}))
                    ])
                } else return ([{type: 'student', id: 'LIST'}])
            }
        }),

        //add new student api
        addNewStudent: builder.mutation({
            query: initialStudent => ({
                url: '/student',
                method: 'POST',
                body: { ...initialStudent }

            }),
            invalidatesTags: [{type: 'student', id: 'LIST'}]
        }),

        //delete student api
        deleteStudent: builder.mutation({
            query: ({ id }) => ({
                url: '/student',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'student', id: arg.id}]
        })

    
    })
})

export const { useGetStudentsQuery, useAddNewStudentMutation, useDeleteStudentMutation } = studentApiSlice

export const selectStudentsResult = studentApiSlice.endpoints.getStudents.select()

const selectStudentsData = createSelector(
    selectStudentsResult,
    studentsResult => studentsResult.data
)

export const { 
    selectAll: selectAllStudents,
    selectById: selectStudentById,
    selectIds: selectStudentIds
 } = studentsAdapter.getSelectors(state => selectStudentsData(state) ?? initialState)