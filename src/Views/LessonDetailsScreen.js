/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Dimensions, ScrollView, Linking} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';
import {WebView} from 'react-native-webview';

import {useWindowDimensions} from 'react-native';

import HTML from 'react-native-render-html';

const {width} = Dimensions.get('screen');

import {materialTheme} from '../constants';
import {getLessonDetails, getSelectedLession} from '../reducers/selectors';

const LessonDetailsScreen = props => {
  let lesson = useSelector(getSelectedLession);

  if (lesson && lesson.length) {
    lesson = lesson[0];
  }
  const contentWidth = useWindowDimensions().width;

  const renderLessonDetail = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block style={styles.subscriptions}>
          <Text bold size={16}>
            {lesson?.title?.rendered || ''}
          </Text>
          <HTML
            source={{html: lesson?.content?.rendered || ''}}
            onLinkPress={(event, linkUrl) => {
              Linking.openURL(linkUrl);
            }}
            ignoredTags={IGNORED_TAGS.filter(tag => tag !== 'video')}
            renderers={{
              iframe: (
                htmlAttribs,
                children,
                convertedCSSStyles,
                passProps,
              ) => {
                return (
                  <Block
                    key={passProps.key}
                    style={{
                      width: '100%',
                      aspectRatio: 16.0 / 9.0,
                      marginTop: 1,
                      marginBottom: 1,
                    }}>
                    <WebView
                      scrollEnabled={false}
                      source={{uri: htmlAttribs.src}}
                      style={{flex: 1, width: '100%', aspectRatio: 16.0 / 9.0}}
                    />
                  </Block>
                );
              },

              video: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                return (
                  <Block
                    key={passProps.key}
                    style={{
                      width: '100%',
                      aspectRatio: 16.0 / 9.0,
                      marginTop: 16,
                      marginBottom: 16,
                    }}>
                    <WebView
                      scrollEnabled={false}
                      javaScriptEnabled={true}
                      allowsFullscreenVideo={true}
                      userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 
 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                      source={{uri: htmlAttribs.src}}
                      mediaPlaybackRequiresUserAction={true}
                      injectedJavaScript={`document.getElementsByTagName("video")[0].controlsList="nodownload";`}
                      style={{flex: 1, width: '100%', aspectRatio: 16.0 / 9.0}}
                    />
                  </Block>
                );
              },
            }}
            contentWidth={contentWidth}
          />
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderLessonDetail()}
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  products: {
    width: width,
  },
  subscriptions: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginTop: 0,
    borderRadius: 0,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
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
    backgroundColor: materialTheme.COLORS.SWITCH_OFF,
  },
  lessonItself: {
    padding: 20,
    borderBottomColor: materialTheme.COLORS.SWITCH_OFF,
    borderBottomWidth: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default LessonDetailsScreen;
