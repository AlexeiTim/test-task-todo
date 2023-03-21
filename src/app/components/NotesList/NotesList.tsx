import React from 'react';
import { NoteType, TypeTag } from '../../../types/app';
import Note from './Note/Note';

type NotesListProps = {
  tags: TypeTag[];
  notes: NoteType[];
  onDeleteNote: (id: number) => void;
  createNewEditTag: (id: number, tags: Array<String>) => void;
};

const NotesList = (props: NotesListProps) => {
  return (
    <div className="container">
      <div className="notes">
        <ul className="notes__list">
          {props.notes.map((note) => (
            <Note
              tags={props.tags}
              createNewEditTag={props.createNewEditTag}
              key={note.id}
              onDeleteNote={props.onDeleteNote}
              notes={note.tags}
              text={note.text}
              id={note.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotesList;
