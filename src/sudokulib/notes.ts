export type Notes = boolean[][];

export function newNotes(): Notes {
  const notes: Notes = [];
  for (let i = 0; i < 81; i++) {
    const cellNotes = [];
    for (let i = 0; i <= 9; i++) {
      cellNotes.push(false);
    }
    notes.push(cellNotes);
  }
  return notes;
}

export function modifyNotes(notes: Notes, cell: number, value: number): Notes {
  const newNotes: Notes = [...notes];
  const cellNotes = [...notes[cell]];
  cellNotes[value] = !cellNotes[value];
  newNotes[cell] = cellNotes;
  return newNotes;
}

export function hasNote(notes: Notes, cell: number, value: number): boolean {
  return notes[cell][value];
}
