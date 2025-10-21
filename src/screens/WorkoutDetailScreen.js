import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const { width: screenWidth } = Dimensions.get('window');

const WorkoutDetailScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { workout } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onVideoLoad = (data) => {
    setVideoDuration(data.duration);
  };

  const onVideoProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onVideoEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const seekTo = (time) => {
    if (videoRef.current) {
      videoRef.current.seek(time);
    }
  };

  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    seekTo(newTime);
  };

  const skipForward = () => {
    const newTime = Math.min(videoDuration, currentTime + 10);
    seekTo(newTime);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      flex: 1,
      textAlign: 'center',
      marginHorizontal: 20,
    },
    backButton: {
      padding: 8,
      minHeight: 44,
      minWidth: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 20,
    },
    workoutInfo: {
      marginBottom: 30,
    },
    workoutName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    equipmentName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.primary,
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.textSecondary,
      marginBottom: 30,
    },
    videoSection: {
      marginBottom: 30,
    },
    videoContainer: {
      backgroundColor: '#000',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 15,
    },
    video: {
      width: screenWidth - 32,
      height: (screenWidth - 32) * 0.5625, // 16:9 aspect ratio
    },
    videoControls: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    controlButton: {
      marginHorizontal: 15,
      padding: 10,
    },
    playButton: {
      backgroundColor: theme.primary,
      borderRadius: 30,
      padding: 15,
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeText: {
      color: '#FFFFFF',
      fontSize: 12,
      minWidth: 40,
      textAlign: 'center',
    },
    progressBar: {
      flex: 1,
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 2,
      marginHorizontal: 10,
    },
    progressFill: {
      height: '100%',
      backgroundColor: theme.primary,
      borderRadius: 2,
    },
    noVideoContainer: {
      height: 200,
      backgroundColor: theme.surface,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    noVideoText: {
      fontSize: 16,
      color: theme.textSecondary,
      marginTop: 10,
    },
    createdAt: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
      marginTop: 20,
    },
  });

  const createdDate = new Date(workout.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {workout.name}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.equipmentName}>{workout.equipment}</Text>
        </View>

        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>Vídeo Demonstrativo</Text>
          {workout.videoUri ? (
            <View style={styles.videoContainer}>
              <Video
                ref={videoRef}
                source={{ uri: workout.videoUri }}
                style={styles.video}
                paused={!isPlaying}
                resizeMode="contain"
                onLoad={onVideoLoad}
                onProgress={onVideoProgress}
                onEnd={onVideoEnd}
                controls={false}
              />
              <View style={styles.videoControls}>
                <View style={styles.controlsRow}>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={skipBackward}
                    activeOpacity={0.7}
                  >
                    <Icon name="replay-10" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePlayPause}
                    activeOpacity={0.7}
                  >
                    <Icon 
                      name={isPlaying ? "pause" : "play-arrow"} 
                      size={30} 
                      color="#FFFFFF" 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={skipForward}
                    activeOpacity={0.7}
                  >
                    <Icon name="forward-10" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.progressContainer}>
                  <Text style={styles.timeText}>
                    {formatTime(currentTime)}
                  </Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: videoDuration > 0 
                            ? `${(currentTime / videoDuration) * 100}%` 
                            : '0%' 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.timeText}>
                    {formatTime(videoDuration)}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.noVideoContainer}>
              <Icon name="videocam-off" size={50} color={theme.textSecondary} />
              <Text style={styles.noVideoText}>
                Nenhum vídeo disponível para este treino
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{workout.description}</Text>
        </View>

        <Text style={styles.createdAt}>
          Criado em {createdDate}
        </Text>
      </ScrollView>
    </View>
  );
};

export default WorkoutDetailScreen;