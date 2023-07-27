import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, theme} from 'galio-framework';
import TouchableScale from 'react-native-touchable-scale';
import { materialTheme } from '../constants';

const {width} = Dimensions.get('screen');

const CourseCard = ({
  course,
  horizontal,
  full,
  style = {},
  imageStyle = {},
  onPress,
  disabled,
}) => {
  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.product,
        styles.shadow,
        style,
        horizontal && styles.horizontal,
      ]}
      onPress={() => onPress(course)}>
      <Block flex style={[styles.imageContainer, styles.shadow]}>
        <LinearGradient
          colors={['#FF9800', '#F44336']}
          style={imageStyles}>
          <Text style={styles.titleFill}>{course?.title?.rendered}</Text>
          <Image
            source={course.fimg_url ? {
              uri: course.fimg_url,
            }: null}
          />
        </LinearGradient>
      </Block>

      <Block flex space="between" style={styles.productDescription}>
        <Text style={styles.productTitle}>{course?.title?.rendered || ''}</Text>
        <Text style={styles.price}>{course?.course_price}</Text>
        <Text>
          {course?.course_price ? `Price: ${course?.course_price}` : 'Free'}
        </Text>
      </Block>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  product: {
    backgroundColor: '#fff',
    marginVertical: 20,
    borderWidth: 0,
    minHeight: 114,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    fontSize: 18,
    fontWeight: '600',
    color: '#F44336',
  },
  productDescription: {
    padding: 10,
  },
  titleFill: {
    fontSize: 30,
    color: '#fff',
    opacity: 0.1,
    fontWeight: 'bold',
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 10,
    marginTop: -16,
    backgroundColor: '#ddd',
  },
  horizontal: {
    flexDirection: 'row',
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - 20 * 3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  price: {
    fontWeight: '300',
    color: '#f4a261',
  },
});
