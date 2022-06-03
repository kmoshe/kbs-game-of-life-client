import { Generation } from './generation';

export interface GetGenerationRequest {
    rows: number; 
    columns: number; 
    previousGeneration: Generation;
}