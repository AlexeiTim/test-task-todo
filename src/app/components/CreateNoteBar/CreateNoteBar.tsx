import React from 'react';

type CreateNoteBarProps = {
  addNote: (value: string) => void;
};

const CreateNoteBar = (props: CreateNoteBarProps) => {
  const [inputValue, setInputValue] = React.useState('');

  const onChangeInputValue = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addNoteHandler = () => {
    props.addNote(inputValue);
    setInputValue('');
  };

  return (
    <div className="container">
      <div className="create-bar">
        <input
        placeholder='Create note...'
          className="input create-bar__input"
          type="text"
          value={inputValue}
          onChange={onChangeInputValue}
        />
        <button className="button create-bar__button" onClick={addNoteHandler}>
          Add
        </button>
      </div>
    </div>
  );
};

export default CreateNoteBar;
