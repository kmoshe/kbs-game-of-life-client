import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl, nextGenerationUrl, firstGenerationUrl} from '../../../configuration/configuration';
import { Generation } from '../models/generation';
import { GetFirstGenerationRequest } from '../models/getFirstGenerationRequest'
import { GetFirstGenerationResponse } from '../models/getFirstGenerationResponse'
import { GetNextGenerationRequest } from '../models/getNextGenerationRequest';
import { GetNextGenerationResponse } from '../models/getNextGenerationResponse';
 
export const gameOfLifeApi = createApi({
    reducerPath: 'gameOfLifeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl
    }),
    endpoints: (builder) => ({
        getFirstGeneration: builder.query<Generation, GetFirstGenerationRequest>({
            query: (request) => {
                const { rows, columns } = request;
                return { 
                    url: firstGenerationUrl, 
                    params: { rows, columns }
                }
            }, 

            transformResponse: (response: GetFirstGenerationResponse) => {
                return response.generation;
            }
        }), 
        getNextGeneration: builder.query<GetNextGenerationResponse, GetNextGenerationRequest>({
            query: (request) => ({
                url: nextGenerationUrl,
                method: 'POST',
                body: request,
            }),
        })
    })
});

export const { useGetFirstGenerationQuery, useGetNextGenerationQuery } = gameOfLifeApi;