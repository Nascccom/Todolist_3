import React, {memo, useCallback} from 'react';

type SuperButtonType = {
    buttonName: string
    callBack: () => void
    className?: string
}
const SuperButton = (props: SuperButtonType) => {

    const onClickHandler =()=> {
        props.callBack()
    }

    return (
      <button className={props.className}
              onClick={onClickHandler}>
          {props.buttonName}
      </button>
    );
};

export const SuperButtonRM = memo(SuperButton)