import React from 'react';
import { TypeTag } from '../../../types/app';
import { AiFillDelete } from 'react-icons/ai';
import ChooseTagList from './ChooseTagList';

type TagsListProps = {
  tags: Array<TypeTag>;
  deleteTag: (id: number) => void;
  addTag: (value: string) => void;
  uniqueTags: String[];
};

const TagsList = (props: TagsListProps) => {
  const [inputValue, setInputValue] = React.useState('');
  const onChangeInputValue = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addTag = () => {
    const hasTagValue = props.tags.find(
      (tag) => tag.value.toLowerCase() === inputValue.toLowerCase(),
    );
    if (hasTagValue) {
      setInputValue('');
      return;
    }
    props.addTag(inputValue.replace(/#/gi, ''));
    setInputValue('');
  };
  const onDeleteTag = (id: number) => {
    props.deleteTag(id);
  };

  return (
    <div className="container">
      <div className="tags">
        <div className="tags__creater">
          <>
            <ChooseTagList addTag={props.addTag} uniqueTags={props.uniqueTags} />
          </>
          <>
            <input
              value={inputValue}
              onChange={onChangeInputValue}
              className="input tags__input"
              type="text"
              placeholder="Create tag..."
            />
            <button onClick={addTag} className="button tags__button">
              Create
            </button>
          </>
        </div>
        <div className="tags__list">
          {props.tags.map((tag) => (
            <div className="tags__item" key={tag.id}>
              <span className="tags__item-text">#{tag.value}</span>
              <span onClick={() => onDeleteTag(tag.id)} className="tags__item-button">
                <AiFillDelete className="tags__icon" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsList;
