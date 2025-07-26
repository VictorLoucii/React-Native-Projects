import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';




// Import your custom types
import { CustomTheme } from '../themes/CustomTheme';
import { Comment } from '../navigation/navigationTypes';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';

// Define the props that this component will accept
interface CommentItemProps {
  comment: Comment;
  currentUserId: string | null;
  onDeleteComment: (commentId: number) => void;
  onEditComment: (comment: Comment) => void;

}

const CommentItem: React.FC<CommentItemProps> = ({ comment, currentUserId, onDeleteComment, onEditComment }) => {
  // LINE FOR DEBUGGING 
  console.log('Comment data received in CommentItem:', JSON.stringify(comment, null, 2));

  const { colors } = useTheme() as CustomTheme;

  // Format the timestamp into a readable "time ago" string
  // e.g., "about 5 hours ago", "less than a minute ago"
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });

  // Check if the current user is the author of the comment
  const isAuthor = currentUserId === comment.user_id;



  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        style={styles.avatar}
        source={
          comment.profiles?.avatar_url
            ? { uri: comment.profiles.avatar_url }
            : require('../../assets/userImage.png') // Fallback image
        }
      />

      {/* Comment Content */}
      <View style={styles.commentBody}>
        <View style={styles.commentHeader}>
          <Text style={[styles.username, { color: colors.textPrimary }]}>
            {comment.profiles?.username || 'Anonymous User'}
          </Text>
          <Text style={[styles.timestamp, { color: colors.textPrimary }]}>
            {timeAgo}
          </Text>

          {/* --- MENU --- */}
          {isAuthor && (
            <Menu>
              <MenuTrigger>
                <Ionicons name="ellipsis-vertical" size={20} color={colors.icon} style={{ marginLeft: 8 }} />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => onEditComment(comment)}>
                  <Text style={{ color: colors.textPrimary }}>Edit</Text>
                </MenuOption>
                <MenuOption onSelect={() => onDeleteComment(comment.id)}>
                  <Text style={{ color: colors.textPrimary }}>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )}
          {/* --- END of NEW MENU --- */}



        </View>
        <Text style={[styles.commentText, { color: colors.textPrimary }]}>
          {comment.content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // A subtle separator line
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.medium,
  },
  commentBody: {
    flex: 1, // Ensures this part takes up the remaining space
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  username: {
    fontFamily: FONTS.interSemiBold,
    fontSize: FONTsize.medium,
  },
  timestamp: {
    fontFamily: FONTS.interRegular,
    fontSize: FONTsize.small,
  },
  commentText: {
    fontFamily: FONTS.interRegular,
    fontSize: FONTsize.medium,
    lineHeight: 22, // Improves readability
  },
});

export default React.memo(CommentItem);
// The Problem: VideoPlayerScreen's state updates constantly to move the video slider. By default, this forces every CommentItem to re-render, even if its own data hasn't changed, causing performance issues.
// The Solution: A two-part fix.
// 1. React.memo: This tells the CommentItem to be "smart." It makes it check if its own props (like the 'comment' object) have actually changed before it re-renders.
// 2. useCallback: For React.memo to work on props that are functions (like 'onDeleteComment'), those functions must be stabilized in the parent component (VideoPlayerScreen) using the useCallback hook. Otherwise, a new function is created on every render, making React.memo think the props have changed.
