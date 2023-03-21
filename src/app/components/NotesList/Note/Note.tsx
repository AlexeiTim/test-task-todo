import React from 'react';
import { TypeTag } from '../../../../types/app';
import HightLightString from './HightLightString';
type NoteProps = {
  id: number;
  text: string;
  notes: String[];
  tags: TypeTag[];
  onDeleteNote: (id: number) => void;
  createNewEditTag: (id: number, tag: String[]) => void;
};

const Note: React.FC<NoteProps> = ({
  tags,
  id,
  text = '',
  onDeleteNote,
  notes,
  createNewEditTag,
}) => {
  const [edit, setEdit] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(text);
  const onChangeInputValue = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const onChangeEditMode = () => {
    if (inputValue.includes('#')) {
      const getTag = inputValue.split(' ').filter((item) => item.includes('#'));
      const deleteHash = getTag.map((tag) => tag.replace(/#/gi, ''));
      createNewEditTag(id, deleteHash);
      setInputValue(inputValue.replace(/#/gi, ''));
    }
    setEdit(!edit);
  };

  const onDeleteCurrentNote = (id: number) => {
    onDeleteNote(id);
  };

  return (
    <div className="note">
      <div className="note__top-content">
        {edit ? (
          <div className="note__input-block">
            <HightLightString array={inputValue.split(' ')} tags={tags} />
            <input
              className="input note__input"
              onChange={onChangeInputValue}
              value={inputValue}
            ></input>
          </div>
        ) : (
          <div className="note__input-block">
            <span className="note__text">{inputValue}</span>
          </div>
        )}
        <div className="note__buttons">
          <button className="button note__button" onClick={onChangeEditMode}>
            {edit ? 'Change' : 'Edit'}
          </button>
          <button onClick={() => onDeleteCurrentNote(id)} className="button note__button">
            Delete
          </button>
        </div>
      </div>
      <div className="note__bottom-content">
        <div className="note__tags">
          {notes
            ? notes.map((tag, index) => (
                <p key={index} className="note__tag">
                  #{tag}
                </p>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Note;


