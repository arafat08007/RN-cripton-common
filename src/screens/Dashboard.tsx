import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header, Icon, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Geolocation from 'react-native-geolocation-service';

import theme, { appColors } from '~/theme';
import SSP from '~/screens/SSP';
import MIS from '~/screens/MIS';
import { RootState } from '~/redux/store';
import { getStatus, getSummary } from '~/redux/attendance';
import { getLocations } from '~/redux/approvals';
import { logout } from '~/redux/auth';
import { RootStackParamList } from '~/App';
import Summary from '~/components/Summary';
import AttendancePrompt from '~/components/AttendancePrompt';
import UserInfo from '~/components/UserInfo';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface DashboardScreenProps {
  navigation: NavigationProp;
}

export type TabParamList = {
  SSP: undefined;
  MIS: undefined;
};
const Tab = createMaterialTopTabNavigator<TabParamList>();

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true,
      authorizationLevel: 'whenInUse',
    });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}

export default ({ navigation }: DashboardScreenProps) => {
  const status = useSelector(
    (state: RootState) => state.attendance.dailyStatus,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatus());
    dispatch(getSummary());
    dispatch(getLocations());
    requestPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        placement="left"
        rightComponent  ={
          <Icon
            name="logout"
            type="antdesign"
            color="#fff"
            size={14}
           
            onPress={() => {
              dispatch(logout());
              navigation.replace('Login');
            }}
          />
        }
     //   centerComponent={{ text: 'CRIPTON', style: { color: '#fff' } }}
        leftComponent={
          <UserInfo/>
        
         
        }
        
        containerStyle={{ borderBottomWidth: 0, borderRadius:10 }}
      />
      <View style={styles.timeBar}>
        <View>
          <Text style={styles.timeText}>In Time</Text>
          <Text style={styles.timeText}>{status.InTime}</Text>
        </View>
        <View>
          <Text style={styles.timeText}>Out Time</Text>
          <Text style={styles.timeText}>{status.OutTime}</Text>
        </View>
        <View>
          <Text style={styles.timeText}>Status</Text>
          <Text style={styles.timeText}>{status.Status}</Text>
        </View>
      </View>
      <Summary />

      <Tab.Navigator
      initialRouteName="SSP"

        tabBarOptions={{
       //   style: { backgroundColor: theme.colors?.primary },
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          indicatorStyle: { backgroundColor: appColors?.primary },
        }}>
        <Tab.Screen name="SSP" component={SSP} />
        <Tab.Screen name="MIS" component={MIS} />
      </Tab.Navigator>

      <AttendancePrompt />
    </View>
  );
};

const styles = StyleSheet.create({
  timeBar: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
    color: 'white',
    height: 50,
  },
  timeText: {
    color: '#333',
  },
});
