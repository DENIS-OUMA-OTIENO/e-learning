import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../../app/api/apiSlice"

const classRoomsAdapter = createEntityAdapter({})

const initialState = classRoomsAdapter.getInitialState()

export const classRoomApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClassRooms: builder.query({
            query: () => ('/class'),
            validateResponse: (response, result) => {
                return response.status === 200 && !result.isError
            },
            
            transformResponse: responseData => {
                const loadedClassRooms = responseData.map(classRoom => {
                    classRoom.id = classRoom._id
                    return classRoom
                })
                return classRoomsAdapter.setAll(initialState, loadedClassRooms)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return([
                        {type: 'classRoom', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'classRoom', id}))
                    ])
                } else return ([{type: 'classRoom', id: 'LIST'}])
            }

        }),

        addNewClassroom: builder.mutation({
            query: initialClassroomData => ({
                url: '/class',
                method: 'POST',
                body: { ...initialClassroomData }
            }),

            invalidatesTags: [
                { type: 'classroom', id: 'LIST'}
            ]

        })
    })
})

export const { useGetClassRoomsQuery, useAddNewClassroomMutation } = classRoomApiSlice

export const selectClassRoomsResult = classRoomApiSlice.endpoints.getClassRooms.select()

const selectClassRoomData = createSelector(
    selectClassRoomsResult,
    classRoomsResult => classRoomsResult.data
)

export const {
    selectAll: selectAllClassRooms,
    selectById: selectClassRoomById,
    selectIds: selectClassRoomIds
} = classRoomsAdapter.getSelectors(state => selectClassRoomData(state) ?? initialState)

