import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';


const CommentsScreen = () => {
  const { theme } = useTheme();

  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('Usuário');

  useEffect(() => {
    loadComments();
    loadUserName();
  }, []);

  const loadComments = async () => {
    try {
      const savedComments = await AsyncStorage.getItem('comments');
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const loadUserName = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.name) {
          setUserName(profile.name.split(' ')[0]); // Usa apenas o primeiro nome
        }
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

  const saveComments = async (commentsData) => {
    try {
      await AsyncStorage.setItem('comments', JSON.stringify(commentsData));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  };

  const addComment = () => {
    if (!newComment.trim()) {
      Alert.alert('Erro', 'Digite um comentário para enviar.');
      return;
    }

    const comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      author: userName,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    saveComments(updatedComments);
    setNewComment('');
  };

  const deleteComment = (id) => {
    Alert.alert(
      'Excluir Comentário',
      'Tem certeza que deseja excluir este comentário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedComments = comments.filter(comment => comment.id !== id);
            setComments(updatedComments);
            saveComments(updatedComments);
          },
        },
      ]
    );
  };

  const likeComment = (id) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
    saveComments(updatedComments);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 4,
    },
    content: {
      flex: 1,
      paddingBottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyText: {
      fontSize: 18,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
    commentsList: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    commentCard: {
      backgroundColor: theme.card,
      borderRadius: 15,
      padding: 15,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    commentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    authorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    avatarText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    authorName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    commentTime: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
    deleteButton: {
      padding: 5,
    },
    commentText: {
      fontSize: 16,
      color: theme.text,
      lineHeight: 22,
      marginBottom: 10,
    },
    commentActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    likeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15,
      backgroundColor: theme.surface,
    },
    likeCount: {
      marginLeft: 5,
      fontSize: 14,
      color: theme.text,
      fontWeight: '600',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.surface,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.background,
      maxHeight: 100,
    },
    sendButton: {
      backgroundColor: theme.primary,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    userAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    userAvatarText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
    userName: {
      fontSize: 14,
      color: theme.text,
      fontWeight: '600',
    },
    userSubtext: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Comentários</Text>
        <Text style={styles.subtitle}>
          {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.userName}>Comentando como: {userName}</Text>
          <Text style={styles.userSubtext}>
            Você pode alterar seu nome no perfil
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {comments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="chat-bubble-outline" size={80} color={theme.textSecondary} />
            <Text style={styles.emptyText}>
              Nenhum comentário ainda.{'\n'}
              Seja o primeiro a comentar!
            </Text>
          </View>
        ) : (
          <ScrollView 
            style={styles.commentsList} 
            showsVerticalScrollIndicator={false}
          >
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <View style={styles.authorInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {comment.author.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.authorName}>{comment.author}</Text>
                      <Text style={styles.commentTime}>
                        {formatDate(comment.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteComment(comment.id)}
                  >
                    <Icon name="delete" size={20} color={theme.error} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.commentText}>{comment.text}</Text>

                <View style={styles.commentActions}>
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => likeComment(comment.id)}
                  >
                    <Icon 
                      name={comment.likes > 0 ? "favorite" : "favorite-border"} 
                      size={18} 
                      color={comment.likes > 0 ? theme.error : theme.textSecondary} 
                    />
                    <Text style={styles.likeCount}>{comment.likes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Escreva um comentário..."
          placeholderTextColor={theme.textSecondary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={addComment}
        >
          <Icon name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;