import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CourseList = ({ course, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.courseItem}
            onPress={() => onPress(course)}
        >
            <Image source={course?.image} style={styles.courseImage} />
            <View style={styles.courseDetails}>
                <Text style={styles.courseName}>{course?.title?.rendered}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    courseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    courseImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    courseDetails: {
        flex: 1,
    },
    courseName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    courseDescription: {
        fontSize: 12,
        color: '#555',
    },
});

export default CourseList;
