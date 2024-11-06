import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const subjectsAdapter = createEntityAdapter({})

const initialState = subjectsAdapter.getInitialState()

export const subjectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubjects: builder.query({
            query: () => ('/subject'),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },

            transformResponse: responseData => {
                const loadedSubjects = responseData.map(subject => {
                    subject.id = subject._id
                    return subject
                })
                return subjectsAdapter.setAll(initialState, loadedSubjects)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return([
                        {type: 'subject', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'subject', id}))
                    ])
                } else return ([{ type: 'subject', id: 'LIST'}])
            }

        }),

        addNewSubject: builder.mutation({
            query: initialSubjectData => ({
                url: '/subject',
                method: 'POST',
                body: {...initialSubjectData}
            }),

            invalidatesTags: [{ type: 'subject', id: 'LIST'}]
        }),

        updateSubject:  builder.mutation({
            query: initialSubjectData => ({
                url: '/subject',
                method: 'PUT',
                body: {...initialSubjectData}
            }),

            invalidatesTags: (result, error, arg) => [
                { type: 'subject', id: arg.id}
            ]
        })
    })
})

export const { useGetSubjectsQuery, useAddNewSubjectMutation, useUpdateSubjectMutation } = subjectApiSlice

export const selectSubjectsResult = subjectApiSlice.endpoints.getSubjects.select()

const selectSubjectsData = createSelector(
    selectSubjectsResult,
    subjectsResult => subjectsResult.data
)

export const {
    selectAll: selectAllSubjects,
    selectById: selectSubjectById,
    selectIds: selectSubjectIds
} = subjectsAdapter.getSelectors(state => selectSubjectsData(state) ?? initialState)