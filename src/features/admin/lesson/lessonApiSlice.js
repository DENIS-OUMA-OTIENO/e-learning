import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const lessonsAdapter = createEntityAdapter({})

const initialState = lessonsAdapter.getInitialState()

export const lessonApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLessons: builder.query({
            query: () => ('/lesson'),
            validateStatus : (response, result) => {
                return response.status === 200 && !result.isError
            },
            
            transformResponse: responseData => {
                const loadedLessons = responseData.map(lesson => {
                    lesson.id = lesson._id
                    return lesson
                })

                return lessonsAdapter.setAll(initialState, loadedLessons)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        { type: 'lesson', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'lesson', id }))
                    ]
                } else return [{ type: 'lesson', id: 'LIST' }]
            }
            
        }),

        addNewLesson: builder.mutation({
            query: initialLessonData => ({
                url: '/lesson',
                method: 'POST',
                body: { ...initialLessonData }
            }),

            invalidatesTags: [{ type: 'lesson', id: 'LIST' }]
        }),
        updateLesson:  builder.mutation({
            query: initialLessonData => ({
                url: '/lesson',
                method: 'PUT',
                body: {...initialLessonData}
            }),

            invalidatesTags: (result, error, arg) => [
                { type: 'lesson', id: arg.id}
            ]
        })

    })
})

export const { useGetLessonsQuery, useAddNewLessonMutation, useUpdateLessonMutation } = lessonApiSlice

export const selectLessonsResult = lessonApiSlice.endpoints.getLessons.select()

const selectLessonsData = createSelector(
    selectLessonsResult,
    lessonsResult => lessonsResult.data
)

export const { 
    selectAll: selectAllLessons,
    selectById: selectLessonById,
    selectIds: selectLessonIds
} = lessonsAdapter.getSelectors(state => selectLessonsData(state) ?? initialState)