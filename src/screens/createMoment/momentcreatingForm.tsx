import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Button, Text, Menu, Chip } from 'react-native-paper';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { lightTheme } from '../../theme';
import { FormLabel } from '../../automic-elements/formLabel';
import { SelectionChip } from '../../automic-elements/selectionChip';
import { InfoCard } from '../../automic-elements/infoCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../automic-elements/customButton';
import { Category } from '../../data/momentCategories';
import DateTimePicker from '@react-native-community/datetimepicker';
// import CountryFlag from 'react-native-country-flag';
import { useCreateMoment } from '../../hooks/useCreateMoment';
import { useUpdateMoment } from '../../hooks/useUpdateMoment';
import { useAvailableLanguages } from '../../hooks/useAuthQuery';
import { authApi } from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../constants/StorageKeys';
import { Language, getLanguagesByIds } from '../../utils/languageUtils';

export const MomentCreatingForm = ({
  navigation,
  route,
  selectedSubCategory,
  moment,
}: any) => {
  const category: Category = route.params?.category;
  const subCategory = route.params?.subCategory;
  const { mutate: createMoment, isPending: isCreating } = useCreateMoment();
  const { mutate: updateMoment, isPending: isUpdating } = useUpdateMoment();
  const isPending = isCreating || isUpdating;

  // Fetch available languages (master data)
  const { data: availableLanguages = [], isLoading: isLoadingLanguages } = useAvailableLanguages();

  // Default colors if no category selected (fallback)
  const primaryColor = category?.primaryColor || lightTheme.colors.wishesColor;
  const bgColor = category?.bgColor || '#FADAFF';
  const borderColor = category?.borderColor || '#FADAFF';

  const [momentText, setMomentText] = useState(moment?.content || '');
  const [isImmediate, setIsImmediate] = useState(true);
  const [duration, setDuration] = useState(60);

  // Language Selection State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [scheduledTime, setScheduledTime] = useState('');
  const [isLoadingUserLanguages, setIsLoadingUserLanguages] = useState(true);

  useEffect(() => {
    const loadLanguages = async () => {
      if (!availableLanguages || availableLanguages.length === 0) {
        return;
      }

      try {
        setIsLoadingUserLanguages(true);

        // If editing a moment, use the moment's languages
        if (moment?.languages && Array.isArray(moment.languages)) {
          // moment.languages should now be an array of IDs
          const momentLangs = getLanguagesByIds(moment.languages, availableLanguages);
          setSelectedLanguages(momentLangs);
          setIsLoadingUserLanguages(false);
          return;
        }

        // Otherwise, fetch user's selected languages from the API
        const response = await authApi.getLanguages();
        if (response.data.success && response.data.languages) {
          // response.data.languages is an array of language IDs
          const languageIds = response.data.languages;
          const mappedLanguages = getLanguagesByIds(languageIds, availableLanguages);
          setSelectedLanguages(mappedLanguages);
        }
      } catch (error) {
        console.error('Failed to load languages', error);
      } finally {
        setIsLoadingUserLanguages(false);
      }
    };

    loadLanguages();
  }, [availableLanguages, moment]);

  /* FILTER LANGUAGES */
  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return availableLanguages;
    return availableLanguages.filter(lang =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, availableLanguages]);

  /* SELECT / UNSELECT LANGUAGE */
  const toggleLanguage = (language: Language) => {
    setSelectedLanguages(prev => {
      const exists = prev.find(l => l.id === language.id);
      if (exists) {
        return prev.filter(l => l.id !== language.id);
      }
      return [...prev, language];
    });
  };

  const isSelected = (id: string) => selectedLanguages.some(l => l.id === id);

  const handleCreateMoment = () => {
    if (moment) {
      const payload = {
        content: momentText,
        languages: selectedLanguages.map(l => l.id), // Send language IDs
        subCategory: selectedSubCategory,
      };

      updateMoment(
        { momentId: moment._id, data: payload },
        {
          onSuccess: () => {
            navigation.navigate('app-layout', {
              footerSlectedIndex: 0,
              initialTab: '2',
              timestamp: Date.now(),
            });
          },
          onError: error => {
            console.error('Failed to update moment', error);
          },
        },
      );
    } else {
      const payload = {
        category: category?.title.toLocaleLowerCase() || 'wishes',
        subCategory: selectedSubCategory || 'birthday',
        content: momentText,
        languages: selectedLanguages.map(l => l.id), // Send language IDs
        scheduleType: 'immediate' as const,
        activeTime: 1440,
      };

      createMoment(payload, {
        onSuccess: () => {
          navigation.navigate('app-layout', {
            initialTab: '2',
            timestamp: Date.now(),
          });
        },
        onError: error => {
          console.error('Failed to create moment', error);
        },
      });
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [finalISOTime, setFinalISOTime] = useState('');
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedTime, setPickedTime] = useState<Date | null>(null);

  const onSelectDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPickedDate(selectedDate);
      setShowTimePicker(true); // open time picker next
    }
  };

  const onSelectTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setPickedTime(selectedTime);

      if (pickedDate) {
        const final = new Date(
          pickedDate.getFullYear(),
          pickedDate.getMonth(),
          pickedDate.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes(),
        );

        const iso = final.toISOString();
        setFinalISOTime(iso);
        setScheduledTime(iso); // <-- set inside your UI input box
      }
    }
  };

  /* RENDER ONE LANGUAGE ROW */
  const renderLanguageItem = ({ item }: { item: Language }) => {
    const selected = isSelected(item.id);

    return (
      <TouchableOpacity
        onPress={() => toggleLanguage(item)}
        activeOpacity={0.7}
        style={[
          styles.languageItem,
          selected && {
            borderColor: '#FF9C01',
            backgroundColor: '#FFF8F0',
            borderWidth: 1,
          },
        ]}
      >
        <View style={styles.languageRow}>
          {/* <CountryFlag isoCode={item.flagCode} size={20} /> */}

          <Text style={styles.languageName}>{item.name}</Text>
        </View>

        {selected && (
          <View style={styles.checkIconContainer}>
            <Icon name="check" size={16} color="#FFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Description Input */}
      <View style={{ ...styles.section, marginBottom: 15 }}>
        <FormLabel
          style={{
            fontSize: moderateScale(13),
            color: lightTheme.colors.darkText,
            marginBottom: verticalScale(4),
            fontFamily: 'Poppins-Medium',
          }}
        >
          Tell us about your moment
        </FormLabel>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            placeholder="e.g., Its my birthday today. Would love to hear some wishes."
            placeholderTextColor={lightTheme.colors.placeholder}
            value={momentText}
            onChangeText={setMomentText}
            maxLength={60}
            multiline
            numberOfLines={5}
            style={styles.textInput}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
            theme={{ colors: { primary: primaryColor, background: '#FFFFFF' } }}
          />
          <Text style={styles.charCount}>{momentText.length}/60</Text>
        </View>
      </View>

      {/* Language Selection */}
      <View style={styles.section}>
        <FormLabel
          style={{
            fontSize: moderateScale(13),
            color: lightTheme.colors.darkText,
            marginBottom: verticalScale(4),
            fontFamily: 'Poppins-Medium',
          }}
        >
          What language do you prefer?
        </FormLabel>

        {/* Loading State */}
        {(isLoadingLanguages || isLoadingUserLanguages) && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={primaryColor} />
            <Text style={styles.loadingText}>Loading languages...</Text>
          </View>
        )}

        {/* SELECTED TAGS */}
        {selectedLanguages.length > 0 && (
          <View
            style={[
              styles.selectedContainer,
              {
                backgroundColor: bgColor,
                borderColor: borderColor,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={styles.selectedLabel}>
              Selected ({selectedLanguages.length}):
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedLanguages.map(lang => (
                <Chip
                  key={lang.id}
                  onClose={() => toggleLanguage(lang)}
                  style={[
                    styles.chip,
                    { backgroundColor: lightTheme.colors.primary },
                  ]}
                  textStyle={styles.chipText}
                  closeIcon={() => (
                    <Icon name="close-circle" size={16} color="#FFF" />
                  )}
                >
                  {lang.name}
                </Chip>
              ))}
            </ScrollView>
          </View>
        )}

        {/* SEARCH */}
        <TextInput
          placeholder="Search languages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          theme={{ colors: { primary: primaryColor, background: '#FFFFFF' } }}
        />

        {/* LIST */}
        {searchQuery ? (
          <View style={styles.listContainer}>
            <ScrollView
              style={{ height: verticalScale(200) }}
              contentContainerStyle={styles.listContent}
              nestedScrollEnabled={true}
            >
              {filteredLanguages.map(item => (
                <React.Fragment key={item.id}>
                  {renderLanguageItem({ item })}
                  <View style={{ height: verticalScale(8) }} />
                </React.Fragment>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>

      {/* Create Button */}
      <CustomButton
        onPress={handleCreateMoment}
        title={moment ? 'Update Moment' : 'Create Moment'}
        disabled={!selectedSubCategory || !momentText || isPending}
      />

      {/* Info Card */}
      <InfoCard
        title="How it works:"
        items={[
          'Your moment will appear on the Wall of Joy',
          'People can send you support reactions',
          'Someone might connect with you for a 30sec call',
          'Stay online to receive calls!',
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: scale(16),
    paddingBottom: verticalScale(32),
  },
  section: {
    marginBottom: verticalScale(20),
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    fontSize: moderateScale(13),
    paddingVertical: verticalScale(10),
  },
  inputOutline: {
    height: verticalScale(68),
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    borderColor: '#9A9797',
  },
  inputContent: {
    paddingBottom: verticalScale(20), // Space for char count
    height: verticalScale(60),
  },
  charCount: {
    position: 'absolute',
    bottom: verticalScale(12),
    right: scale(12),
    fontSize: moderateScale(12),
    color: '#9CA3AF',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: scale(34),
    padding: scale(2),
    height: verticalScale(36),
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(34),
  },
  toggleText: {
    fontSize: moderateScale(14),
    color: lightTheme.colors.text,
    fontWeight: '500',
  },
  dateTimeContainer: {
    marginTop: verticalScale(20),
  },
  dateTimeInput: {
    backgroundColor: '#FFFFFF',
    fontSize: moderateScale(14),
  },
  dateTimeOutline: {
    borderRadius: scale(8),
    borderColor: '#9A9797',
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    marginRight: 8,
  },
  chipText: {
    fontSize: moderateScale(12),
    color: '#FFF',
  },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9CA3AF', // Grey border
    borderRadius: scale(8),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: moderateScale(14),
    color: '#9CA3AF', // Placeholder color style
  },
  createButton: {
    backgroundColor: '#414042', // Dark grey from theme primary
    borderRadius: scale(8),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(18),
  },
  createButtonContent: {
    height: verticalScale(48),
  },
  createButtonLabel: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  selectedContainer: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  selectedLabel: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    // marginBottom: 16,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  listContent: {
    padding: 10,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageName: {
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  checkIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF9C01', // Using a fixed color or could be primaryColor
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  loadingText: {
    fontSize: moderateScale(10),
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },
});
