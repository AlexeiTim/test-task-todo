import React from 'react';
import CreateNoteBar from './components/CreateNoteBar/CreateNoteBar';
import NotesList from './components/NotesList/NotesList';
import TagsList from './components/TagsList/TagsList';
import { NoteType, TypeTag } from '../types/app';

function App() {
  const [notes, setNotes] = React.useState<NoteType[]>([]);
  const [tags, setTags] = React.useState<TypeTag[]>([]);
  let uniqueTags: String[] = [];

  const getAllTags = () => {
    const allCurrentTags: String[] = [];
    notes.forEach((note) => note.tags.forEach((tag) => allCurrentTags.push(tag)));
    const uniqueTagsArray = [...new Set(allCurrentTags)];
    return uniqueTagsArray;
  };

  const addTag = (value: string) => {
    const checkHaveTag = tags.find((tag) => tag.value === value);
    if (!checkHaveTag) {
      const newId = Number(tags.at(-1)?.id) + 1 || 1;
      setTags([...tags, { id: newId, value: value }]);
    }
  };

  const createNewEditTag = (id: number, newTag: String[]) => {
    let newNotes = notes.filter((note) => note.id === id);
    let notesTagsCurrent: String[] = newNotes[0].tags;
    notesTagsCurrent = [...notesTagsCurrent, ...newTag];
    const newArray: NoteType[] = notes.map((item) =>
      item.id === id ? { ...item, tags: notesTagsCurrent } : item,
    );
    setNotes([...newArray]);

    let newId = Number(tags.at(-1)?.id) + 1 || 1;
    const newTags: TypeTag[] = newTag.map((tag) => {
      const singleTag: TypeTag = {
        id: newId,
        value: tag,
      };
      newId += 1;
      return singleTag;
    });
    setTags([...tags, ...newTags]);
  };

  const deleteTag = (id: number) => {
    const newArray = tags.filter((tag) => tag.id !== id);
    setTags(newArray);
  };

  const addNote = (value: string) => {
    const newId = Number(notes.at(-1)?.id) + 1;
    const newNote = {
      id: newId || 1,
      text: value,
      tags: [],
    };
    setNotes([...notes, newNote]);
  };

  const onDeleteNote = (id: number) => {
    const filterArray = notes.filter((note) => note.id !== id);
    setNotes([...filterArray]);
  };

  React.useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.notes);
        setTags(data.tags);
      })
      .catch((error) => setNotes([{ id: 1, text: error, tags: [] }]));
  }, []);
  uniqueTags = getAllTags();
  let filterArray = notes;
  if (tags.find((tag) => tag.value === 'all' && tag)) {
    filterArray = notes;
  } else {
    filterArray = filterArray.filter((item) => tags.some((tag) => item.tags.includes(tag.value)));
  }

  return (
    <div className="App">
      <CreateNoteBar addNote={addNote} />
      <TagsList uniqueTags={uniqueTags} addTag={addTag} deleteTag={deleteTag} tags={tags} />
      <NotesList
        tags={tags}
        createNewEditTag={createNewEditTag}
        onDeleteNote={onDeleteNote}
        notes={filterArray}
      />
    </div>
  );
}

export default App;
