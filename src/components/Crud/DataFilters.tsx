import {JSX} from 'react';
import {Box, FormField, TextInput} from 'grommet';
import {DataFilter, DataQuery} from './types.tsx';

type Props = {
    crudId: string;
    filters: DataFilter[],
    query: DataQuery,
    setQuery: (query: DataQuery) => void
}

export const DataFilters = ({crudId, query, filters, setQuery}: Props): JSX.Element => {
    return (
        <Box>
            {filters.map((filter) => (
                <FormField label={filter.title} key={crudId + '_' + filter.id}>
                    <TextInput
                        value={filter.getValue(query)}
                        onChange={(event) => setQuery(filter.onChange(query, event.target.value))}
                    />
                </FormField>
            ))}
        </Box>
    )
}


