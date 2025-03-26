import React from 'react';
import { View, Text, Button } from 'react-native';
import AccountDetails from "../components/profile/AcountDetails";
import user from "../../assets/data/user.json"; 

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AccountDetails user={user} />
    </View>
  );
};

export default ProfileScreen;