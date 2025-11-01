import { ITheme, useTheme } from '../../../src/theme';
import { ScrollViewContainer } from '../../../src/common/components/Container/ScrollViewContainer';
import { AnimatedFAQCard } from '../../../src/common/components/FAQ/AnimatedFAQCard';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, LayoutAnimation, SectionList, SectionListRenderItemInfo } from 'react-native';
import { FAQItem, FAQSection, getFaqs } from '../../../src/mocks/faq.data';

type ExpandedIndex = {
  section: number;
  item: number;
} | null;

export const FAQsScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [expandedIndex, setExpandedIndex] = useState<ExpandedIndex>(null);
  const faqs = useMemo(() => getFaqs(), []);
  const handlePress = (sectionIndex: number, itemIndex: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedIndex?.section === sectionIndex && expandedIndex?.item === itemIndex) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex({ section: sectionIndex, item: itemIndex });
    }
  };

  const renderItem = ({ item, index, section }: SectionListRenderItemInfo<FAQItem, FAQSection>) => {
    const sectionIndex = faqs.findIndex(s => s.title === section.title);
    const isExpanded = expandedIndex?.section === sectionIndex && expandedIndex?.item === index;

    return <AnimatedFAQCard item={item} isExpanded={isExpanded} onPress={() => handlePress(sectionIndex, index)} />;
  };

  const renderSectionHeader = ({ section }: { section: FAQSection }) => (
    <Text style={styles.header}>
      <Text style={styles.bulletColor}>ⓘ </Text> {section.title}
    </Text>
  );

  return (
    <ScrollViewContainer>
      <SectionList scrollEnabled={false} sections={faqs} renderItem={renderItem} renderSectionHeader={renderSectionHeader} keyExtractor={(item, index) => item.question + index} stickySectionHeadersEnabled={false} />
    </ScrollViewContainer>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    header: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 12,
      color: theme.black,
    },
    bulletColor: {
      color: theme.appMainColor,
      fontSize: 20,
    },
  });
