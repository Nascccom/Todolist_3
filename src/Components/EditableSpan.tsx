import React, {ChangeEvent, memo, useCallback, useState} from 'react';

type EditableSpanType = {
    removeCallBack?: () => void
    title: string
    callBack: (changedTitle: string) => void
}
const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [renameTitle, setRenameTitle] = useState(props.title)

    const onDoubleClickHandler = ()=> {
        setEdit(true)
    }

    const onBlurHandler = () => {
        if (renameTitle === '') {
            if (props.removeCallBack !== undefined) {
                props.removeCallBack()
            }
        } else {
            setEdit(false)
            props.callBack(renameTitle.trim())
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRenameTitle(e.currentTarget.value)
    }

    return (
      !edit
        ? <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
        : <input autoFocus
                 onBlur={onBlurHandler}
                 onChange={onChangeHandler}
                 value={renameTitle}/>
    )
};

export const EditableSpanRM = memo(EditableSpan)
