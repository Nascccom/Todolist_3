import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';

type AddingAnElementType = {
    addItem: (newTitle: string) => void
}

const AddingAnElement = (props: AddingAnElementType ) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState('')

    const inputItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }

    const addItemButtonHandler = () => {
        if (newTitle.trim()) {
            props.addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>)  => {
        if (e.key === 'Enter') {
            addItemButtonHandler()
        }
    }

    return (
      <div>
          <input value={newTitle}
                 onChange={inputItemHandler}
                 onKeyDown={onKeyDownHandler}/>
          <button onClick={addItemButtonHandler}>+</button>
          {!!error && <div>{error}</div>}
      </div>
    );
};

export const AddingAnElementRM = memo(AddingAnElement)
