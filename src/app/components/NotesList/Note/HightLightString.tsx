import { TypeTag } from '../../../../types/app';

type HightLightStringProps = {
  array: string[];
  tags: TypeTag[];
};
const HightLightString = ({ array, tags }: HightLightStringProps) => {
  const createTagsArray = tags.map((item) => item.value);
  return (
    <span className="note__text">
      {array.map((item) =>
        createTagsArray.includes(item) ? (
          <span key={item} className="input__word active">
            {item}
          </span>
        ) : (
          <span key={item} className="input__word">
            {item}
          </span>
        ),
      )}
    </span>
  );
};

export default HightLightString;
