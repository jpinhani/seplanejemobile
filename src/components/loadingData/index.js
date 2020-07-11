import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const App = (props) => (
    <View style={[props.data ? { height: '100%' } : { height: '0%' }, styles.container, styles.horizontal]}>
        <ActivityIndicator animating={props.data} size={80} color="blue" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        // height: '100%',
        flex: 0,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        // padding: 10
    }
});

export default App;
