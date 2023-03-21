import React from 'react';
import { TypeTag } from '../../../types/app';

type ChooseTagListProps = {
  uniqueTags: String[];
  addTag : (value: string) => void;
};

const ChooseTagList: React.FC<ChooseTagListProps> = ({ uniqueTags, addTag }) => {
  const chooseTag = (e: React.FormEvent<HTMLSelectElement>) => {
    const currentValue = e.currentTarget.value.replace(/#/gi, '');
    addTag(currentValue);
  };
  return (
    <div className="tags__select">
      <select onChange={chooseTag} name="tags" id="tags">
        <option value="#all">all</option>
        {uniqueTags.map((tag) => (
          <option key={tag + '1'} value={'#' + tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChooseTagList;
