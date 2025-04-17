import React from 'react';
import AccountDetails from "../components/profile/AcountDetails";
import { View } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AccountDetails/>
    </View>
  );
};

export default ProfileScreen;

