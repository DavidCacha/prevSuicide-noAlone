import React from 'react';
import AccountDetails from "../components/profile/AcountDetails";
import { useSelector } from 'react-redux';
import { View } from 'react-native';


const ProfileScreen = () => {
  const profileData = useSelector(state => state.profile.profile);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AccountDetails user={profileData} />
    </View>
  );
};

export default ProfileScreen;

