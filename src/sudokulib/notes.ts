import { produce } from "immer";
import { getAllCellNeighbors } from "./util";
import { Puzzle } from "./puzzles";

export type Notes = boolean[][];

export function newNotes(defaultValue: boolean = false): Notes {
  const notes: Notes = [];
  for (let i = 0; i < 81; i++) {
    const cellNotes = [];
    for (let i = 0; i <= 9; i++) {
      cellNotes.push(defaultValue);
    }
    notes.push(cellNotes);
  }
  return notes;
}

export function modifyNotes(notes: Notes, cell: number, value: number): Notes {
  return produce(notes, (draftNotes) => {
    draftNotes[cell][value] = !draftNotes[cell][value];
  });
}

/** Update notes in response to setting an actual value in a cell */
export function makeNotesReact(
  notes: Notes,
  cell: number,
  value: number
): Notes {
  return produce(notes, (draftNotes) => {
    const neighbors = getAllCellNeighbors(cell);
    neighbors.forEach((index) => {
      draftNotes[index][value] = false;
    });
  });
}

export function hasNote(notes: Notes, cell: number, value: number): boolean {
  return notes[cell][value];
}

export function fillOutNotes(puzzle: Puzzle): Notes {
  let notes = newNotes(true);

  for (let i = 0; i < 81; i++) {
    if (puzzle[i] === 0) {
      continue;
    }

    notes = makeNotesReact(notes, i, puzzle[i]);
  }

  return notes;
}
