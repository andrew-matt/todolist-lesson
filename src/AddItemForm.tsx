import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from 'Button';

type Props = {
  onClick: (title: string) => void
}

export const AddItemForm: FC<Props> = ({onClick}) => {
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  const addItemHandler = () => {
    if (title.trim() !== '') {
      onClick(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter') {
      addItemHandler();
    }
  };

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
      />
      <Button title={'+'} onClick={addItemHandler}/>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};