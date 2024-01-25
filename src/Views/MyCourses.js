import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import CourseCard from '../components/cards';
import { screens } from '../constants/screens';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCourse } from '../reducers/app.reducers';
import CourseList from '../components/CourseList';
import { getCoursesList } from '../reducers/selectors';

const enrolledCoursesData = [
    { id: '1', name: 'Introduction to React Native', image: require('../assets/icon.png'), description: 'Learn the basics of React Native development.' },
    { id: '2', name: 'Advanced JavaScript', image: require('../assets/icon.png'), description: 'Master advanced concepts of JavaScript programming.' },
    { id: '3', name: 'Mobile App Design', image: require('../assets/icon.png'), description: 'Explore principles and techniques of mobile app design.' },
];

export default function EnrolledCourses({ navigation }) {
    const dispatch = useDispatch();
    const courses = useSelector(getCoursesList);
    const [enrolledCourses, setEnrolledCourses] = useState(enrolledCoursesData);

    const onPress = (item) => {
        dispatch(setSelectedCourse(item));
        navigation.navigate(screens.COURSE_DETAILS);
    };

    const renderItem = ({ item }) => {
        return <CourseList course={item} onPress={onPress} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                scrollEnabled
                data={courses}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
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
