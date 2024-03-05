import {JSX, useEffect, useState} from 'react';
import {DataTable} from './DataTable.tsx';
import {ApiIntegration, Data, DataQuery} from './types.tsx';
import {DataPagination} from './DataPagination.tsx';
import {Card, CardBody, Tab, Tabs, Text, Toolbar} from 'grommet';
import {DataFilters} from './DataFilters.tsx';
import {DataSecondaryFilters} from './DataSecondaryFilters.tsx';
import {DataGrid} from './DataGrid.tsx';
import {useDebounce} from '../../hooks/use-debounce.tsx';
import {DataPrimaryActionButtons} from './DataPrimaryActionButtons.tsx';
import {Grid as GridIcon, Table as TableIcon} from 'grommet-icons';

export type Props<T> = {
    crudId: string;
    integration: ApiIntegration<T>;
    limit: number;
}

export function Crud<T>({crudId, integration, limit}: Props<T>): JSX.Element {
    const [data, setData] = useState<Data<T>>({
        hasError: false,
        records: [],
        total: 0
    });

    const [query, setQuery] = useState<DataQuery>({
        limit: limit,
        page: 1,
        queryParams: {},
    });

    const queryDebounced = useDebounce(query, 500);

    useEffect(() => {
        integration.getData(queryDebounced).then((data: Data<T>) => {
            setData(data);
        });
    }, [queryDebounced, integration]);

    function setPage(page: number): void {
        setQuery({...query, page: page});
    }

    function setQueryParamsProxy(newQuery: DataQuery) {
        setQuery({...newQuery, queryParams: newQuery.queryParams})
    }

    if (data.hasError) {
        return (
            <Card pad="medium" margin="medium" background="white">
                <CardBody>
                    <Text>Something went wrong, please refresh page</Text>
                </CardBody>
            </Card>
        );
    }

    return (
        <>
            {(integration.getPrimaryFiltersSpecifications || integration.getSecondaryFiltersSpecifications || integration.getPrimaryButtons) && (
                <Card pad="medium" margin="medium" background="white">
                    <CardBody>
                        {integration.getPrimaryFiltersSpecifications && (
                            <DataFilters crudId={crudId} filters={integration.getPrimaryFiltersSpecifications()}
                                         query={query} setQuery={setQueryParamsProxy}/>
                        )}
                        <Toolbar>
                            {integration.getSecondaryFiltersSpecifications && (
                                <DataSecondaryFilters crudId={crudId}
                                                      filters={integration.getSecondaryFiltersSpecifications()}
                                                      query={query} setQuery={setQueryParamsProxy}/>
                            )}
                            {integration.getPrimaryButtons && (
                                <DataPrimaryActionButtons crudId={crudId} buttons={integration.getPrimaryButtons()}
                                                          data={data} setData={setData}/>
                            )}
                        </Toolbar>
                    </CardBody>
                </Card>
            )}
            <Card pad="medium" margin="medium" background="white">
                <CardBody>
                    <Tabs>
                        <Tab title="Таблица" icon={<TableIcon size='medium'/>}>
                            <DataTable crudId={crudId} fields={integration.getFieldsSpecifications()}
                                       getRecordId={integration.getRecordId}
                                       buttons={integration.getRecordButtons ? integration.getRecordButtons() : []}
                                       setData={setData} data={data}/>
                        </Tab>
                        <Tab title="Карточки" icon={<GridIcon size='medium'/>}>
                            <DataGrid crudId={crudId} fields={integration.getFieldsSpecifications()}
                                      getRecordId={integration.getRecordId}
                                      buttons={integration.getRecordButtons ? integration.getRecordButtons() : []}
                                      setData={setData} data={data}/>
                        </Tab>
                    </Tabs>

                    <DataPagination total={data.total} page={query.page} setPage={setPage}/>
                </CardBody>
            </Card>
        </>
    )
}