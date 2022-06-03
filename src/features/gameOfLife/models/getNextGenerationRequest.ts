import { Generation } from './generation';

export interface GetNextGenerationRequest {
    rows: number, 
    columns: number,
    generation: Generation
}