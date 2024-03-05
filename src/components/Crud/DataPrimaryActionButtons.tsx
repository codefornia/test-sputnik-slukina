import {JSX} from 'react';
import {Box} from 'grommet';
import {Data, PrimaryActionButton} from './types.tsx';
import {DataPrimaryActionButton} from './DataPrimaryActionButton.tsx';

type Props<T> = {
    crudId: string;
    buttons: PrimaryActionButton<T>[];
    data: Data<T>;
    setData: (data: Data<T>) => void;
}

export function DataPrimaryActionButtons<T>({crudId, buttons, data, setData}: Props<T>): JSX.Element {
    return (
        <Box gap="small" direction="row" pad="small">
            {buttons.map((button) => (
                <DataPrimaryActionButton button={button} key={crudId + '_' + button.id} data={data} setData={setData}/>
            ))}
        </Box>
    )
}


