import React from 'react';
import { AsyncStorage } from 'react-native';

const userID = async () => await AsyncStorage.getItem("userId").then(response => response);
const token = async () => await AsyncStorage.getItem("token").then(response => response);

async function config() {
    const tokenMid = await token();
    const userMid = await userID();
    return ({
        headers: { Authorization: `Bearer ${tokenMid}`, user: userMid },
    });
}

export { config, userID }