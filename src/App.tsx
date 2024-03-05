import {Grid, Grommet, Header, PageContent, Text} from 'grommet';
import {Crud} from './components';
import {DummyJsonIntegration} from './components/API';

function App() {
    return (
        <Grommet full>
            <Header
                background="brand"
                pad={{left: "medium", right: "small", vertical: "small"}}
                elevation="medium"
            >
                <Text size="large">Sputnik Demo</Text>
            </Header>
            <PageContent background="light-1">
                <Grid pad={{bottom: "large"}}>
                    <Crud
                        crudId="main"
                        integration={DummyJsonIntegration}
                        limit={10}
                    />
                </Grid>
            </PageContent>
        </Grommet>
    );
}

export default App;
