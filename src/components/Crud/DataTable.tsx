import {JSX} from 'react';
import {Box, Table, TableBody, TableCell, TableHeader, TableRow} from 'grommet';
import {Data, DataField, RecordActionButton} from './types.tsx';
import {DataRecordActionButton} from './DataRecordActionButton.tsx';

type Props<T> = {
    crudId: string;
    data: Data<T>;
    setData: (data: Data<T>) => void;
    fields: DataField<T>[];
    buttons: RecordActionButton<T>[]
    getRecordId: (record: T) => string;
}

export function DataTable<T>({crudId, data, setData, fields, getRecordId, buttons}: Props<T>): JSX.Element {
    return (
        <Box pad={{top: 'medium', bottom: 'small'}}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {fields.map((field: DataField<T>) => (
                            <TableCell scope="col" border="bottom" key={crudId + '_' + field.id}>
                                <strong>{field.header}</strong>
                            </TableCell>
                        ))}
                        {buttons.length > 0 && (
                            <TableCell>
                                <Box
                                    gap="small"
                                    direction="row"
                                    justify="end"
                                    pad="small"
                                >
                                    <strong>Действия</strong>
                                </Box>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.records.map((record) => (
                        <TableRow key={crudId + '_' + getRecordId(record)}>
                            {fields.map((field: DataField<T>) => (
                                <TableCell scope="col" border="bottom"
                                           key={crudId + '_' + field.id + '_' + getRecordId(record)}>
                                    {field.getValue(record)}
                                </TableCell>
                            ))}
                            {buttons.length > 0 && (
                                <TableCell scope="col" border="bottom">
                                    <Box gap="small" direction="row" justify="end" pad="small">
                                        {buttons.map((button) => (
                                            <DataRecordActionButton button={button} key={crudId + '_' + button.id}
                                                                    record={record} data={data} setData={setData}/>
                                        ))}
                                    </Box>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}