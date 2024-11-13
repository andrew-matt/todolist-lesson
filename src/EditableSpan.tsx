import React, { ChangeEvent, FC, useState } from 'react';

type Props = {
  title: string
  onClick: (value: string) => void
}

export const EditableSpan: FC<Props> = ({title, onClick}) => {
  const [value, setValue] = useState(title);
  const [editMode, setEditMode] = useState(false);

  const editModeHandle = () => {
    setEditMode(!editMode);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onClick(e.currentTarget.value);
  };

  return (
    <>
      {
        editMode
          ? <input type="text" value={value} onChange={onChangeHandle}
                   onBlur={editModeHandle} autoFocus/>
          : <span onDoubleClick={editModeHandle}>{title}</span>
      }
    </>
  );
};
