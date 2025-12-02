import { View, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
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
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: lightTheme.colors.background }}>
      <Container style={{ flex: 1, paddingTop: verticalScale(65) }}>
        <Text
          style={{
            color: lightTheme.colors.darkText,
            fontSize: scale(22),
            fontFamily: 'Poppins-Medium',
            lineHeight: verticalScale(36),
          }}
        >
          Create your moment
        </Text>
        <Text
          style={{
            color: lightTheme.colors.darkText,
            fontSize: scale(12),
            lineHeight: verticalScale(17),
            marginTop: verticalScale(0),
            marginBottom: verticalScale(15),
            fontFamily: 'Poppins-Medium',
          }}
        >
          Create your moment to let someone share your Joy for 30 seconds.
        </Text>
        <Divider />

        <Text
          style={{
            color: lightTheme.colors.darkText,
            fontSize: scale(12),
            lineHeight: verticalScale(20),
            marginTop: verticalScale(15),
            marginBottom: verticalScale(10),
            fontFamily: 'Poppins-Medium',
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
            flex: 1,
            backgroundColor: lightTheme.colors.background,
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
                darkColor={item.darkColor}
                containerStyle={{
                  height: 'auto',
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
