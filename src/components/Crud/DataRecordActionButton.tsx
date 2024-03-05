import {JSX, useState} from 'react';
import {Button, Layer} from 'grommet';
import {Data, RecordActionButton} from './types.tsx';

type Props<T> = {
    button: RecordActionButton<T>;
    record: T;
    data: Data<T>;
    setData: (data: Data<T>) => void;
}

export function DataRecordActionButton<T>({button, record, data, setData}: Props<T>): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button primary onClick={() => setOpen(!open)} label={button.label}/>
            {open && (
                <Layer
                    onEsc={() => setOpen(false)}
                    onClickOutside={() => setOpen(false)}
                >
                    {button.onClick(record, data, setData, () => setOpen(false))}
                </Layer>
            )}
        </>
    )
}


