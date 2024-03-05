import {JSX} from 'react';
import {Box, Pagination} from 'grommet';

type Props = {
    page: number,
    total: number
    setPage: (page: number) => void,
}

export const DataPagination = ({total, page, setPage}: Props): JSX.Element => {
    return (
        <Box align="end" pad="small" gap="medium">
            <Pagination numberItems={total} page={page} onChange={({page}) => setPage(page)} size="medium"/>
        </Box>
    )
}