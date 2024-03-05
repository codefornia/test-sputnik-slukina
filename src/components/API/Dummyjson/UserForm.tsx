import {User, UserModify} from './Client/types.tsx';
import {JSX, useState} from 'react';
import {Box, Button, FormField, Heading, TextInput} from 'grommet';

type Props = {
    user?: User;
    onSubmit: (userModify: UserModify) => void;
}

export function UserForm({user, onSubmit}: Props): JSX.Element {
    const [userModify, setUserModify] = useState<UserModify>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        username: user?.username || '',
        age: user?.age || 0,
    });

    return (
        <>
            <Box pad="medium" gap="small" width="medium">
                <Heading level={2} size="small">
                    {user ? 'Редактировать' : 'Создать'} пользователя
                </Heading>

                <FormField label="Имя">
                    <TextInput placeholder="имя" value={userModify.firstName}
                               onChange={(e) => setUserModify({...userModify, firstName: e.target.value})}/>
                </FormField>

                <FormField label="Фамилия">
                    <TextInput placeholder="фамилия" value={userModify.lastName}
                               onChange={(e) => setUserModify({...userModify, lastName: e.target.value})}/>
                </FormField>

                <FormField label="Логин">
                    <TextInput placeholder="логин" value={userModify.username}
                               onChange={(e) => setUserModify({...userModify, username: e.target.value})}/>
                </FormField>

                <FormField label="Возраст">
                    <TextInput placeholder="18" value={userModify.age}
                               onChange={(e) => setUserModify({...userModify, age: parseInt(e.target.value) | 0})}/>
                </FormField>
                <Box
                    as="footer"
                    gap="small"
                    direction="row"
                    align="center"
                    justify="end"
                    pad={{top: 'medium', bottom: 'small'}}
                >
                    <Button primary label="Отправить" onClick={() => {
                        onSubmit(userModify);
                    }}/>
                </Box>
            </Box>
        </>
    );
}