import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Import your custom types and components
import { CustomTheme } from '../themes/CustomTheme';
import { Comment } from '../navigation/navigationTypes';
import CommentItem from './CommentItem'; // Import the component you just made
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';

// Define the props that this component will accept
interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  currentUserId: string | null;
  onDeleteComment: (commentId: number) => void;
  onEditComment: (comment: Comment) => void;

}

const CommentList: React.FC<CommentListProps> = ({ comments, loading, currentUserId, onDeleteComment, onEditComment }) => {
  const { colors } = useTheme() as CustomTheme;

  // Render a loading spinner while comments are being fetched
  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color={colors.textPrimary} />;
  }

  // Render a message if there are no comments to display
  if (comments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No comments yet. Be the first to share your thoughts!
        </Text>
      </View>
    );
  }

  // Render the list of comments using FlatList
  return (
    <FlatList
      data={comments}
      // The renderItem function tells the FlatList how to render each comment.
      // It uses the CommentItem component for this.
      renderItem={({ item }) =>
        <CommentItem
          comment={item}
          currentUserId={currentUserId}
          onDeleteComment={onDeleteComment}
          onEditComment={onEditComment} 

        />}
      // keyExtractor tells the list how to find a unique key for each item.
      keyExtractor={(item) => item.id.toString()}
      // You can add a style to the content container if needed.
      contentContainerStyle={styles.listContentContainer}
      // This prevents the FlatList from creating its own scroll view,
      // as it will be inside the VideoPlayerScreen's ScrollView.
      scrollEnabled={false}  // Important!
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  emptyText: {
    fontFamily: FONTS.interRegular,
    fontSize: FONTsize.medium,
    textAlign: 'center',
  },
  listContentContainer: {
    paddingBottom: spacing.large,
  },
});

export default React.memo(CommentList);
// The Problem: VideoPlayerScreen's state updates constantly to move the video slider. By default, this forces every CommentItem to re-render, even if its own data hasn't changed, causing performance issues.
// The Solution: A two-part fix.
// 1. React.memo: This tells the CommentItem to be "smart." It makes it check if its own props (like the 'comment' object) have actually changed before it re-renders.
// 2. useCallback: For React.memo to work on props that are functions (like 'onDeleteComment'), those functions must be stabilized in the parent component (VideoPlayerScreen) using the useCallback hook. Otherwise, a new function is created on every render, making React.memo think the props have changed.
