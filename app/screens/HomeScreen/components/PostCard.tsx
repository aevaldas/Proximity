import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeImage } from '../../../layout';
import { Typography, ThemeStatic } from '../../../theme';
import { useNavigation } from 'react-navigation-hooks';
import { Routes, PostDimensions } from '../../../constants';
import { parseTimeElapsed, parseLikes } from '../../../utils/shared';

const { FontWeights, FontSizes } = Typography;

type Author = {
  id: string,
  avatar: string,
  handle: string
};

interface PostCardProps {
  id: string,
  author: Author,
  time: string,
  uri: string,
  likes: string[],
  caption: string
};

const PostCard: React.FC<PostCardProps> = ({ id, author, time, uri, likes, caption }) => {

  const { navigate } = useNavigation();

  const navigateToPost = () => navigate(Routes.PostViewScreen, { postId: id });

  const parsedTime = parseTimeElapsed(time);
  const readableTime = parsedTime === 'just now' ? `${parsedTime}` : `${parsedTime} ago`;
  const readableLikes = parseLikes(likes.length);

  return (
    <TouchableOpacity onPress={navigateToPost} activeOpacity={0.9} style={styles.container}>
      <NativeImage
        uri={uri}
        style={styles.postImage}
      />

      <View style={styles.upperContent}>
        <NativeImage
          uri={author.avatar}
          style={styles.avatarImage}
        />
        <View>
          <Text style={styles.handleText}>{author.handle}</Text>
          <Text style={styles.timeText}>{readableTime}</Text>
        </View>
      </View>

      <View style={styles.lowerContent}>
        <Text style={styles.likesText}>{readableLikes}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.captionText}>{caption}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...PostDimensions.Large,
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: ThemeStatic.black,
    overflow: 'hidden',
    borderRadius: 10
  },
  postImage: {
    position: 'absolute',
    ...PostDimensions.Large
  },
  avatarImage: {
    height: 50,
    width: 50,
    backgroundColor: ThemeStatic.placeholder,
    borderRadius: 50,
    marginRight: 10
  },
  upperContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: ThemeStatic.translucent
  },
  lowerContent: {
    justifyContent: 'center',
    padding: 16,
    backgroundColor: ThemeStatic.translucent
  },
  handleText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: ThemeStatic.white
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: ThemeStatic.white,
    marginTop: 2,
  },
  likesText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: ThemeStatic.white
  },
  captionText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: ThemeStatic.white,
    marginTop: 5
  }
});

export default PostCard;