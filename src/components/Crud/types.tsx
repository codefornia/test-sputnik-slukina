import {JSX} from 'react';

export interface ApiIntegration<T> {
    getData(query: DataQuery): Promise<Data<T>>;

    getRecordId(record: T): string;

    getFieldsSpecifications(): DataField<T>[];

    getPrimaryFiltersSpecifications?(): DataFilter[];

    getSecondaryFiltersSpecifications?(): DataFilter[];

    getPrimaryButtons?(): PrimaryActionButton<T>[];

    getRecordButtons?(): RecordActionButton<T>[];
}

export type DataQuery = {
    page: number;
    limit: number;
    queryParams: Record<string, string>;
}

export type Data<T> = {
    records: T[];
    total: number;
    hasError: boolean;
}

export type DataField<T> = {
    id: string;
    header: string;
    getValue(record: T): JSX.Element | string;
}

export type DataFilter = {
    id: string;
    title: string;
    onChange(query: DataQuery, value: string): DataQuery;
    getValue(query: DataQuery): string;
}

export type ActionButton = {
    id: string;
    label: string;
}

export type PrimaryActionButton<T> = ActionButton & {
    onClick(data: Data<T>, setData: (data: Data<T>) => void, close: () => void): JSX.Element;
}

export type RecordActionButton<T> = ActionButton & {
    onClick(record: T, data: Data<T>, setData: (data: Data<T>) => void, close: () => void): JSX.Element;
}
