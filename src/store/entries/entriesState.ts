export interface Entry {
  id: string, // uuid
  title: string,
  learnedAt: string, 
  repeatedAt: string[], 
}

export interface EntriesState {
  list: Entry[]
}

export const entriesState: EntriesState = {
  list: []
}