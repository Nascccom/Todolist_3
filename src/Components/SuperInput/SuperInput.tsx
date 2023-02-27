import React, {ChangeEvent} from 'react';

type SuperInputType = {
    type?: string
    callBack: (e: ChangeEvent<HTMLInputElement>) => void
    callBackKeyDown?: () => void
    value?: string
}
export const SuperInput: React.FC<SuperInputType> = ({type, callBack }) => {


    return (
      <input />
    );
};
