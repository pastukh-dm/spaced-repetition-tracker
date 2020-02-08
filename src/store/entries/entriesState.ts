export interface Entry {
  id: string, // uuid
  title: string,
  learnedAt: string, // dd.mm.yyyy
  repeatedAt: string[], // dd.mm.yyyy
}

export interface EntriesState {
  list: Entry[]
}

export const entriesState: EntriesState = {
  list: []
}