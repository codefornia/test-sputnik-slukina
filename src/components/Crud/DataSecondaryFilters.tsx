import {JSX, useState} from 'react';
import {Box, Button, Heading, Layer} from 'grommet';
import {DataFilter, DataQuery} from './types.tsx';
import {DataFilters} from './DataFilters.tsx';

type Props = {
    crudId: string;
    filters: DataFilter[],
    query: DataQuery,
    setQuery: (query: DataQuery) => void
}

export const DataSecondaryFilters = ({crudId, query, filters, setQuery}: Props): JSX.Element | null => {
    const [open, setOpen] = useState(false);

    if (filters.length === 0) {
        return null;
    }

    return (
        <Box align="start" pad="small">
            <Button primary onClick={() => setOpen(!open)} label="Другие фильтры"/>
            {open && (
                <Layer
                    onEsc={() => setOpen(false)}
                    onClickOutside={() => setOpen(false)}
                >
                    <Box pad="medium" gap="small" width="medium">
                        <Heading level={2} size="small">
                            Другие фильтры
                        </Heading>
                        <DataFilters crudId={crudId} filters={filters} query={query} setQuery={setQuery}/>
                        <Box
                            as="footer"
                            gap="small"
                            direction="row"
                            align="center"
                            justify="end"
                            pad={{top: 'medium', bottom: 'small'}}
                        >
                            <Button label="Закрыть" onClick={() => setOpen(false)}/>
                        </Box>
                    </Box>
                </Layer>
            )}
        </Box>
    )
}
