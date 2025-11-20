import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import { lightTheme } from '../../theme';
import { CategoryCard } from './category';
import { MOMENT_CATEGORIES, Category } from '../../data/momentCategories';
import { scale, verticalScale } from 'react-native-size-matters';

export default function CreateMomentScreen({ navigation }: any) {
  const navigateToMomentCreatingForm = (category: Category) => {
    navigation.navigate('ChoosingSubCategory', { category });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Text
          style={{
            color: lightTheme.colors.darkText,
            fontSize: scale(30),
            fontWeight: '500',
            lineHeight: verticalScale(36),
          }}
        >
          Create your moment
        </Text>

        <Text
          style={{
            color: lightTheme.colors.darkText,
            fontSize: scale(16),
            fontWeight: '500',
            lineHeight: verticalScale(20),
            marginTop: verticalScale(10),
            marginBottom: verticalScale(48),
          }}
        >
          Create your moment to let someone share your Joy for 30 seconds.
        </Text>

        <Text
          style={{
            color: lightTheme.colors.darkText,
            fontSize: scale(16),
            fontWeight: '500',
            lineHeight: verticalScale(20),
            marginTop: verticalScale(10),
            marginBottom: verticalScale(10),
          }}
        >
          Choose Category
        </Text>

        {/* Render categories manually */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {MOMENT_CATEGORIES.map((item) => (
            <View key={item.id} style={{ width: '48%', marginBottom: scale(10) }}>
              <CategoryCard
                title={item.title}
                onPress={() => navigateToMomentCreatingForm(item)}
                primaryColor={item.primaryColor}
                borderColor={item.borderColor}
                bgColor={item.bgColor}
                containerStyle={{
                  height: 'auto',
                  minHeight: verticalScale(110),
                  justifyContent: 'center',
                }}
              />
            </View>
          ))}
        </View>
      </Container>
    </ScrollView>
  );
}
