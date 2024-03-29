import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Block, Text, Button, theme} from 'galio-framework';
import {useWindowDimensions} from 'react-native';
import MaterialTabs from 'react-native-material-tabs';

import HTML from 'react-native-render-html';

import CourseCard from '../components/cards';

const {width} = Dimensions.get('screen');
import {materialTheme} from '../constants';
import {getCourseDetails, getCourseLessons} from '../reducers/selectors';
import {
  fetchLessonsBasedOnCurrentCourse,
  setCurrentLesson,
} from '../reducers/app.reducers';
import { screens } from '../constants/screens';

const CourseDetails = ({navigation}) => {
  const dispatch = useDispatch();
  let course = useSelector(getCourseDetails);
  let lessons = useSelector(getCourseLessons);
  const [selectedTab, setSelectedTab] = useState(0);

  if (course && course.length) {
    course = course[0];
  }
  console.log('course-->', course);
  const contentWidth = useWindowDimensions().width;

  const handleOpenLesson = item => {
    dispatch(setCurrentLesson(item));
    navigation.navigate(screens.LESSON_DETAILS);
  };
  const Curriculum = () => {
    return (
      <Block flex>
        {lessons && lessons.length ? (
          <FlatList
            data={lessons}
            renderItem={({item, index}) => (
              <Block flex style={styles.shadow}>
                <TouchableOpacity
                  onPress={() => handleOpenLesson(item)}
                  style={styles.lessonSection}>
                  <Text color={theme.COLORS.BLACK}>
                    <HTML source={{html: item?.title?.rendered || ''}} />
                  </Text>
                </TouchableOpacity>
              </Block>
            )}
          />
        ) : (
          <Text style={{padding: 10}}>No Curriculum found</Text>
        )}
      </Block>
    );
  };
  const renderCourseDetail = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <CourseCard course={course} horizontal disabled />
        </Block>
        <Block>
          <SafeAreaView style={styles.container}>
            <MaterialTabs
              items={['Overview', 'Lessons']}
              selectedIndex={selectedTab}
              style={{borderRadius:5, overflow:'hidden'}}
              onChange={index => setSelectedTab(index)}
              barColor={'#FF9800'}
              indicatorColor={materialTheme.COLORS.BLACK}
              activeTextColor={materialTheme.COLORS.BLACK}
            />
          </SafeAreaView>
        </Block>
        {selectedTab === 0 && (
          <Block  style={[styles.subscriptions, {marginTop: 0}]}>
            <Text size={14} bold color={materialTheme.COLORS.BLACK}>
              Details
            </Text>
            <HTML
              source={{html: course?.content?.rendered || ''}}
              contentWidth={contentWidth}
            />
          </Block>
        )}
        {selectedTab === 2 && (
          <>
            <Block row space="between" middle style={styles.instructor}>
              <Block row middle>
                <Image
                  source={{uri: products[0].image}}
                  style={styles.imageStyles}
                />
                <Text bold>{course?.instructor?.title}</Text>
              </Block>
              <Block row middle>
                <Text
                  color={materialTheme.COLORS.DEFAULT}
                  bold
                  style={{marginRight: 5}}>
                  5.8
                </Text>
                <SvgXml
                  xml={shapeStartSvg}
                  width={15}
                  color={materialTheme.COLORS.DEFAULT}
                />
              </Block>
            </Block>
            <Block row space="between" middle style={styles.instructor}>
              <Text bold>{course?.instructor?.description}</Text>
            </Block>
            <Block row space="between" middle style={styles.instructor}>
              <Text bold color={'red'}>
                Instructor related courses comming soon
              </Text>
            </Block>
          </>
        )}
        {selectedTab === 1 && <Curriculum />}
      </ScrollView>
    );
  };
  useEffect(() => {
    dispatch(fetchLessonsBasedOnCurrentCourse(course.id));
  }, []);
  return (
    <Block flex center style={styles.home}>
      {renderCourseDetail()}
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  subscriptions: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginTop: 0,
    zIndex: 2,
  },
  instructor: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginTop: 20,
    borderRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  imageStyles: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginRight: 10,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    marginVertical: 3,
  },
  lessonSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.DEFAULT,
    backgroundColor: materialTheme.COLORS.SWITCH_OFF,
  },
  lessonItself: {
    padding: 20,
    borderBottomColor: materialTheme.COLORS.SWITCH_OFF,
    borderBottomWidth: 1,
  },
});
export default CourseDetails;
