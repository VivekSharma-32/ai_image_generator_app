import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import LikeScreen from './src/screens/LikeScreen';

import {colors} from './src/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LikeImagesProvider} from './src/context/LikeImageContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <LikeImagesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.activeTabColor,
            tabBarInactiveTintColor: colors.inactiveTabColor,
            tabBarStyle: {
              backgroundColor: colors.primary,
            },
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="HONE_SCREEN"
            component={HomeScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Feather name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="DISCOVER_SCREEN"
            component={DiscoverScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Feather name="globe" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="LIKE_SCREEN"
            component={LikeScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Feather name="heart" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LikeImagesProvider>
  );
}
