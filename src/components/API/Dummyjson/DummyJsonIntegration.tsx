import {Data, DataField, DataFilter, DataQuery, PrimaryActionButton, RecordActionButton} from '../../Crud/types.tsx';
import APIClient from './Client/ApiClient.tsx';
import {User, UserModify, UsersResponse} from './Client/types.tsx';
import {Box, Button, Heading, Text} from 'grommet';
import {JSX} from "react";
import {UserForm} from './UserForm.tsx';

function getData(query: DataQuery): Promise<Data<User>> {
    const skip = (query.page - 1) * query.limit;

    if (Object.keys(query.queryParams).length === 0) {
        return APIClient.fetchAllUsers(query.limit, skip)
            .then((response: UsersResponse) => processUsersResponse(response))
    }

    return APIClient.fetchUsersFiltered(query.queryParams['key'], query.queryParams['value'], query.limit, skip)
        .then((response: UsersResponse) => processUsersResponse(response))
}

function processUsersResponse(response: UsersResponse): Data<User> {
    return {
        total: response.total,
        records: response.users,
        hasError: response.hasError,
    }
}

function getRecordId(record: User): string {
    return record.id.toString();
}

function getFieldsSpecifications(): DataField<User>[] {
    return [
        {
            id: "username",
            header: "Логин",
            getValue: (record: User) => record.username
        },
        {
            id: "first_name",
            header: "Имя",
            getValue: (record: User) => record.firstName
        },
        {
            id: "last_name",
            header: "Фамилия",
            getValue: (record: User) => record.lastName
        },
        {
            id: "age",
            header: "Возраст",
            getValue: (record: User) => record.age.toString()
        }
    ];
}

function getPrimaryFiltersSpecifications(): DataFilter[] {
    return [
        {
            id: "first_name",
            title: "Имя",
            onChange(query: DataQuery, value: string): DataQuery {
                return setQueryParamFilter(query, "firstName", value);
            },
            getValue(query: DataQuery): string {
                return getFilterValue(query, "firstName");
            }
        }
    ]
}

function getSecondaryFiltersSpecifications(): DataFilter[] {
    return [
        {
            id: "last_name",
            title: "Фамилия",
            onChange(query: DataQuery, value: string): DataQuery {
                return setQueryParamFilter(query, "lastName", value);
            },
            getValue(query: DataQuery): string {
                return getFilterValue(query, "lastName");
            }
        }
    ]
}

function setQueryParamFilter(query: DataQuery, key: string, value: string): DataQuery {
    query.page = 1;

    if (value.length > 0) {
        query.queryParams["key"] = key;
        query.queryParams["value"] = value;

        return query;
    }

    delete query.queryParams["key"];
    delete query.queryParams["value"];

    return query;
}

function getFilterValue(query: DataQuery, key: string): string {
    if (query.queryParams["key"] === key) {
        return query.queryParams["value"];
    }

    return "";
}

function getPrimaryButtons(): PrimaryActionButton<User>[] {
    return [
        {
            id: "create",
            label: "Создать",
            onClick(data: Data<User>, setData, closeModal): JSX.Element {
                return (
                    <Box>
                        <UserForm onSubmit={(userModify: UserModify) => {
                            APIClient.createUser(userModify).then((response) => {
                                if (!response.hasError && response.user) {
                                    setData({
                                        total: data.total + 1,
                                        hasError: false,
                                        records: [response.user, ...data.records]
                                    });
                                } else {
                                    setData({...data, hasError: true});
                                }
                            })
                            closeModal();
                        }}/>
                    </Box>
                );
            }
        }
    ]
}

function getRecordButtons(): RecordActionButton<User>[] {
    return [
        {
            id: "edit",
            label: "Редактировать",
            onClick(modifyRecord: User, data: Data<User>, setData, closeModal): JSX.Element {
                return (
                    <Box>
                        <UserForm user={modifyRecord} onSubmit={(userModify: UserModify) => {
                            APIClient.editUser(modifyRecord.id, userModify).then((response) => {
                                if (!response.hasError) {
                                    setData({
                                        total: data.total,
                                        hasError: false,
                                        records: data.records.map((record: User) => record.id === modifyRecord.id && response.user ? response.user : record)
                                    });
                                } else {
                                    setData({...data, hasError: true});
                                }
                            })
                            closeModal();
                        }}/>
                    </Box>
                );
            }
        },
        {
            id: "view",
            label: "Просмотреть",
            onClick(record: User, _data: Data<User>, _setData, closeModal): JSX.Element {
                return (
                    <Box pad="medium" gap="small" width="medium">
                        <Heading level={2} size="small">
                            Пользователь
                        </Heading>
                        <Text><strong>Логин</strong></Text>
                        <Text>{record.username}</Text>

                        <Text><strong>Имя</strong></Text>
                        <Text>{record.firstName}</Text>

                        <Text><strong>Фамилия</strong></Text>
                        <Text>{record.lastName}</Text>

                        <Text><strong>Возраст</strong></Text>
                        <Text>{record.age}</Text>

                        <Box
                            as="footer"
                            gap="small"
                            direction="row"
                            align="center"
                            justify="end"
                            pad={{top: 'medium', bottom: 'small'}}
                        >
                            <Button label="Закрыть" onClick={() => closeModal()}/>
                        </Box>
                    </Box>
                );
            }
        },
        {
            id: "delete",
            label: "Удалить",
            onClick(deleteRecord: User, data: Data<User>, setData, closeModal): JSX.Element {
                return (
                    <Box pad="medium" gap="small" width="medium">
                        <Heading level={2} size="small">
                            Удалить пользователя
                        </Heading>
                        <Text>Вы уверены что хотите удалить пользователя {deleteRecord.username} ?</Text>

                        <Box
                            as="footer"
                            gap="small"
                            direction="row"
                            align="center"
                            justify="end"
                            pad={{top: 'medium', bottom: 'small'}}
                        >
                            <Button primary label="Удалить" color="status-critical" onClick={() => {
                                APIClient.deleteUser(deleteRecord.id).then((response) => {
                                    if (!response.hasError) {
                                        setData({
                                            total: data.total - 1,
                                            hasError: false,
                                            records: data.records.filter((record: User) => record.id !== deleteRecord.id)
                                        });
                                    } else {
                                        setData({...data, hasError: true});
                                    }
                                })
                                closeModal();
                            }}/>
                            <Button primary label="Закрыть" onClick={() => closeModal()}/>
                        </Box>
                    </Box>
                );
            }
        }
    ]
}

export default {
    getData,
    getFieldsSpecifications,
    getRecordId,
    getPrimaryButtons,
    getPrimaryFiltersSpecifications,
    getRecordButtons,
    getSecondaryFiltersSpecifications,
};