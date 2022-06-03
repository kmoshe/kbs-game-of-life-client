import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { gameOfLifeApi } from '../features/gameOfLife/api/gameOfLifeApi';
import { gameOfLifeSlice } from '../features/gameOfLife/store/gameOfLifeSlice';

export const store = configureStore({
  reducer: {
    [gameOfLifeApi.reducerPath]: gameOfLifeApi.reducer, 
    gameOfLife: gameOfLifeSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(gameOfLifeApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;