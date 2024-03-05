import {JSX} from 'react';
import {Box, Card, CardBody, CardFooter, Grid} from 'grommet';
import {Data, DataField, RecordActionButton} from './types.tsx';
import {DataRecordActionButton} from './DataRecordActionButton.tsx';

type Props<T> = {
    crudId: string;
    data: Data<T>;
    setData: (data: Data<T>) => void;
    fields: DataField<T>[];
    buttons: RecordActionButton<T>[];
    getRecordId: (record: T) => string;
}

export function DataGrid<T>({crudId, data, setData, fields, getRecordId, buttons}: Props<T>): JSX.Element {
    return (
        <Grid gap="small" columns={{count: 'fit', size: ['medium']}} pad={{vertical: 'small'}}>
            {data.records.map((record) => (
                <Card key={getRecordId(record)} pad="small" background="light-1">
                    <CardBody>
                        {fields.map((field: DataField<T>) => (
                            <Box key={crudId + '_' + field.header + '_' + getRecordId(record)}>
                                <strong>{field.header}</strong> {field.getValue(record)}
                            </Box>
                        ))}
                    </CardBody>
                    {buttons.length > 0 && (
                        <CardFooter>
                            <Box
                                gap="small"
                                pad={{vertical: 'small'}}
                                direction="row"
                            >
                                {buttons.map((button) => (
                                    <DataRecordActionButton button={button} key={crudId + '_' + button.id} record={record}
                                                            data={data} setData={setData}/>
                                ))}
                            </Box>
                        </CardFooter>
                    )}
                </Card>
            ))}
        </Grid>
    );
}


