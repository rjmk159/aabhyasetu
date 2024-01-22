import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const StackOptions = ({ navigation, showBackButton = true }) => {
    const handleGoBack = () => {
        navigation.goBack();
    };

    return {
        headerBackTitleVisible: true,
        headerStyle: {
            backgroundColor: '#F44336',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 16 },
        headerLeft: () => {
            if (showBackButton) {
                return (
                    <TouchableOpacity onPress={handleGoBack}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}>
                            <Ionicons name={'arrow-back-outline'} size={24} color={'#FFF'} />
                        </View>
                    </TouchableOpacity>
                );
            }
            return null;
        },
    };
};

export default StackOptions;
