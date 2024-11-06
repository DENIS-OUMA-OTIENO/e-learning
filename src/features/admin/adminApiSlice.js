import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../../app/api/apiSlice'

const adminsAdapter = createEntityAdapter({})

const initialState = adminsAdapter.getInitialState()

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdmins: builder.query({
            query: () => ('/admin'),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAdmins = responseData.map(admin => {
                    admin.id = admin._id
                    return admin
                })
                return adminsAdapter.setAll(initialState, loadedAdmins)
            },

            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return(
                        [{type: 'admin', id: 'LIST'},
                        ...result.ids.map(id =>({type: 'admin', id}))
                    ]
                    )
                } else return [{type: 'admin', id: 'LIST'}]
            }
        }),

    })
})

export const { useGetAdminsQuery } = adminApiSlice

export const selectAdminsResult = adminApiSlice.endpoints.getAdmins.select()

const selectAdminsData = createSelector(selectAdminsResult, adminsResult => adminsResult.data)

export const {
    selectAll: selectAllAdmins,
    selectById: selectAdminById,
    selectIds: selectAdminIds
} = adminsAdapter.getSelectors(state => selectAdminsData(state) ?? initialState) 
  

