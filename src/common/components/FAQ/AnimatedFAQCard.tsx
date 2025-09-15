import { ITheme, useTheme } from '../../../theme';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { RightArrowIcon } from '../../../assets/icons';
import { FAQItem } from '../../../mocks/faqs.data';

type AnimatedFAQCardProps = {
  item: FAQItem;
  isExpanded: boolean;
  onPress: () => void;
};

export const AnimatedFAQCard: React.FC<AnimatedFAQCardProps> = ({ item, isExpanded, onPress }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const animation = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 175,
      useNativeDriver: false,
    }).start();
  }, [animation, isExpanded]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const opacity = animation;

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.questionRow}>
        <Text style={styles.question}>{item.question}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <RightArrowIcon />
        </Animated.View>
      </Pressable>

      <View style={styles.hiddenContent} onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
        <Text style={styles.answer}>{item.answer}</Text>
      </View>

      <Animated.View style={{ height, opacity }}>
        <Text style={styles.answer}>{item.answer}</Text>
      </Animated.View>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.white,
      borderRadius: 12,
      padding: 14,
      marginBottom: 8,
      borderColor: theme.borderColor,
      borderWidth: 1,
    },
    questionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    question: {
      fontSize: 17,
      color: theme.black,
      flex: 1,
      paddingRight: 10,
    },
    answer: {
      fontSize: 15,
      paddingTop: 8,
      lineHeight: 20,
      color: theme.gray,
    },
    hiddenContent: {
      position: 'absolute',
      top: -999,
      left: -999,
      opacity: 0,
    },
  });
