import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal'; // The new library
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your custom types and constants
import { CustomTheme } from '../themes/CustomTheme';
import { FONTsize, spacing } from '../constants/dimensions';
import { FONTS } from '../constants/fonts';

// Define the props that this component will accept
interface CommentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (commentText: string) => Promise<void>; // Expects an async function
  initialValue?: string; // To pre-fill the text input for editing
  title?: string;        // To change the modal title
}

const CommentModal: React.FC<CommentModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  initialValue = '', // Default to empty for new comments
  title = 'Leave a Comment', // Default title
}) => {
  const { colors } = useTheme() as CustomTheme;
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ADD A USEEFFECT HOOK 
  // This ensures that if the user opens the edit modal for a *different*
  // comment, the text input updates correctly.
  useEffect(() => {
    setCommentText(initialValue);
  }, [initialValue]);

  const handleSubmit = async () => {
    // Basic validation: ensure the comment isn't just empty spaces
    if (commentText.trim().length === 0) {
      Alert.alert("Empty Comment", "Please write something before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the async submit function passed from the parent
      await onSubmit(commentText);
      // Clear the text input ONLY on successful submission
      // setCommentText('');
      // We no longer clear the text here; the parent component will close the modal.
    } catch (error) {
      // The parent (VideoPlayerScreen) will handle showing the alert
      console.error("Submission failed in modal:", error);
    } finally {
      // Always re-enable the button, whether it succeeded or failed
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Close modal when tapping the background
      onBackButtonPress={onClose} // Close modal with Android back button
      avoidKeyboard
      style={styles.modal}
    >
      {/* KeyboardAvoidingView makes the modal slide up with the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.content, { backgroundColor: colors.settingOptionsBGC }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: colors.textPrimary }]}>
              Leave a Comment
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={30} color={colors.icon} />
            </TouchableOpacity>
          </View>

          {/* Text Input */}
          <TextInput
            style={[
              styles.input,
              {
                color: colors.textPrimary,
                borderColor: colors.textSecondary,
                backgroundColor: colors.bkGroundClr,
              },
            ]}
            placeholder="Share your thoughts..."
            placeholderTextColor={colors.textSecondary}
            multiline
            value={commentText}
            onChangeText={setCommentText}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: isSubmitting ? '#ccc' : '#A96F00' },
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Comment</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end', // Aligns modal to the bottom
    margin: 0,
  },
  content: {
    padding: spacing.large,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC1C6',
    paddingBottom: spacing.medium,
    marginBottom: spacing.medium,
  },
  headerText: {
    fontFamily: FONTS.interSemiBold,
    fontSize: FONTsize.large,
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.medium,
    textAlignVertical: 'top', // Ensures text starts from the top on Android
    fontSize: FONTsize.medium,
    fontFamily: FONTS.interRegular,
    marginBottom: spacing.large,
  },
  submitButton: {
    paddingVertical: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontFamily: FONTS.interSemiBold,
    fontSize: FONTsize.medium,
  },
});

export default CommentModal;