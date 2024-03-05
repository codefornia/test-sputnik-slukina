import {JSX, useState} from 'react';
import {Button, Layer} from 'grommet';
import {Data, PrimaryActionButton} from './types.tsx';

type Props<T> = {
    button: PrimaryActionButton<T>;
    data: Data<T>;
    setData: (data: Data<T>) => void;
}

export function DataPrimaryActionButton<T>({button, data, setData}: Props<T>): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button primary onClick={() => setOpen(!open)} label={button.label}/>
            {open && (
                <Layer
                    onEsc={() => setOpen(false)}
                    onClickOutside={() => setOpen(false)}
                >
                    {button.onClick(data, setData, () => setOpen(false))}
                </Layer>
            )}
        </>
    )
}


