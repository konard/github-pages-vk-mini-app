import React, { useState, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  Cell,
  Avatar,
  Div,
  Button,
  Title,
  Text
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

function App() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [fetchingUser, setFetchingUser] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
    }
    fetchData();
  }, []);

  const handleGetUserInfo = async () => {
    setFetchingUser(true);
    try {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      console.log('User info:', user);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setFetchingUser(false);
    }
  };

  return (
    <AppRoot mode="full">
      <SplitLayout>
        <SplitCol>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VK Mini App</PanelHeader>
              <Group header={<Header mode="secondary">Welcome!</Header>}>
                <Div>
                  <Title level="1" weight="bold" style={{ marginBottom: 16 }}>
                    VK Mini App on GitHub Pages
                  </Title>
                  <Text style={{ marginBottom: 16 }}>
                    This is a proof of concept demonstrating that VK Mini Apps can be built with React.js and hosted on GitHub Pages.
                  </Text>
                </Div>
              </Group>

              {user && (
                <Group header={<Header mode="secondary">User Information</Header>}>
                  <Cell
                    before={user.photo_200 ? <Avatar src={user.photo_200} /> : null}
                    subtitle={`ID: ${user.id}`}
                  >
                    {user.first_name} {user.last_name}
                  </Cell>
                </Group>
              )}

              <Group header={<Header mode="secondary">VK Bridge API Demo</Header>}>
                <Div>
                  <Button
                    size="l"
                    stretched
                    onClick={handleGetUserInfo}
                    loading={fetchingUser}
                  >
                    Get User Info
                  </Button>
                </Div>
              </Group>

              <Group header={<Header mode="secondary">About</Header>}>
                <Div>
                  <Text>
                    This application uses:
                  </Text>
                  <ul>
                    <li>React.js with TypeScript</li>
                    <li>@vkontakte/vk-bridge for VK API integration</li>
                    <li>@vkontakte/vkui for native VK UI components</li>
                    <li>GitHub Pages for hosting</li>
                  </ul>
                </Div>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;
