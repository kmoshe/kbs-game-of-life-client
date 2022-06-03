import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../app/store';
import { CellStatus } from '../models/cellStatus';
import { Generation } from '../models/generation';
import { GetFirstGenerationRequest } from '../models/getFirstGenerationRequest';
import { GetNextGenerationRequest } from '../models/getNextGenerationRequest';
import { GetNextGenerationResponse } from '../models/getNextGenerationResponse';

interface GameOfLifeState {
    generation: Generation;
    loading: boolean;
    isWipedOut: boolean;
    error: any;
}

const initialState: GameOfLifeState= {
    generation: [], 
    loading: false, 
    isWipedOut: false,
    error: null,
}

export const getFirstGeneration = createAsyncThunk(
    'gameOfLife/firstGeneration',
    async (firstGenerationRequest: GetFirstGenerationRequest) => {
        const { rows, columns } = firstGenerationRequest;
        const response = await axios.get<GetNextGenerationResponse>(`http://localhost:4000/cells?rows=${rows}&columns=${columns}`);
        if (response.status === 200) {
            return response.data;
        }
    }
);

export const computeNextGeneration = createAsyncThunk(
    'gameOfLife/nextGeneration',
    async (nextGenerationRequest: GetNextGenerationRequest) => {
        try {
            const response = await axios.post<GetNextGenerationResponse>(`http://localhost:4000/cells/nextGen`, nextGenerationRequest);
            return response;
        } catch {
            return null;
        }
    }
);

export const gameOfLifeSlice = createSlice({
    name: 'gameOfLife',
    initialState,
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder.addCase(computeNextGeneration.fulfilled, (state, action) => {
            if (action.payload?.data?.generation) { 
                state.generation = [];
                action.payload.data.generation.map((row) => { 
                    state.generation.push(row); 
                    if (state.isWipedOut) {
                        const liveCells = row.filter(cellStatus => cellStatus === CellStatus.ALIVE);
                        if (liveCells?.length > 0) {
                            state.isWipedOut = false;
                        }
                    }
                });
            } else {
                console.log({ action })
            }
        })
    }
});

export default gameOfLifeSlice.reducer;

export const selectGeneration = (state: RootState) => state.gameOfLife.generation;

export const selectIsWipedOut = (state: RootState) => state.gameOfLife.isWipedOut;