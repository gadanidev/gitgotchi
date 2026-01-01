import fs from 'fs/promises';
import path from 'path';
import { PetState } from './types';

const DB_PATH = path.join(process.cwd(), 'pet-state.json');

const INITIAL_STATE: PetState = {
    name: 'GitGotchi',
    level: 1,
    health: 100,
    hunger: 0,
    mood: 'neutral',
    lastFedAt: new Date().toISOString(),
    history: []
};

export async function getPetState(): Promise<PetState> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, create it with initial state
        await savePetState(INITIAL_STATE);
        return INITIAL_STATE;
    }
}

export async function savePetState(state: PetState): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(state, null, 2), 'utf-8');
}

export async function updatePetState(updater: (current: PetState) => PetState): Promise<PetState> {
    const current = await getPetState();
    const simpleDeepClone = JSON.parse(JSON.stringify(current)); // simple clone to avoid mutation issues if any
    const newState = updater(simpleDeepClone);
    await savePetState(newState);
    return newState;
}
