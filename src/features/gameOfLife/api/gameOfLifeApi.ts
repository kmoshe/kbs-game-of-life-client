import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Generation } from '../models/generation';
import { GetFirstGenerationRequest } from '../models/getFirstGenerationRequest'
import { GetFirstGenerationResponse } from '../models/getFirstGenerationResponse'
import { GetNextGenerationRequest } from '../models/getNextGenerationRequest';
import { GetNextGenerationResponse } from '../models/getNextGenerationResponse';
 
export const gameOfLifeApi = createApi({
    reducerPath: 'gameOfLifeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    endpoints: (builder) => ({
        getFirstGeneration: builder.query<Generation, GetFirstGenerationRequest>({
            query: (request) => {
                const { rows, columns } = request;
                return { 
                    url: '/cells', 
                    params: { rows, columns }
                }
            }, 

            transformResponse: (response: GetFirstGenerationResponse) => {
                return response.generation;
            }
        }), 
        getNextGeneration: builder.query<GetNextGenerationResponse, GetNextGenerationRequest>({
            query: (request) => ({
                url: '/cells/nextGen', 
                method: 'POST',
                body: request,
            }),
        })
    })
});

export const { useGetFirstGenerationQuery, useGetNextGenerationQuery } = gameOfLifeApi;