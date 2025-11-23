import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import WelcomeScreen from '../screens/welcome/welcome';
import MomentsScreen from '../screens/welcome/moments';
import GiveJoyScreen from '../screens/welcome/giveGoy';
import SafePrivateScreen from '../screens/welcome/safePrivate';

const { width } = Dimensions.get('window');

const sliderItems = [
  <View style={{ flex: 1, justifyContent: 'center', width: "100%" }}>
    <WelcomeScreen />
  </View>,
  <View style={{ paddingHorizontal: 30, flex: 1 }}>
    <MomentsScreen />
  </View>,
  <View style={{ paddingHorizontal: 30, flex: 1 }}>
    <GiveJoyScreen />
  </View>,
  <View style={{ paddingHorizontal: 30, flex: 1 }}>
    <SafePrivateScreen />
  </View>
];

const CustomPagination = ({ paginationIndex, data }: any) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_: any, index: number) => (
        <View
          key={index}
          style={[styles.dot, paginationIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );
};

const Slider = React.forwardRef((props, ref) => {
  const swiperRef = React.useRef<SwiperFlatList>(null);

  React.useImperativeHandle(ref, () => ({
    goNext: () => {
      if (swiperRef.current) {
        const currentIndex = swiperRef.current.getCurrentIndex();
        const nextIndex = (currentIndex + 1) % sliderItems.length;
        swiperRef.current.scrollToIndex({ index: nextIndex });
      }
    },
  }));

  return (
    <View style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        // autoplay
        autoplayDelay={2}
        // autoplayLoop
        index={0}
        data={sliderItems}
        showPagination
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        PaginationComponent={({ paginationIndex }) => (
          <CustomPagination
            paginationIndex={paginationIndex}
            data={sliderItems}
          />
        )}
        renderItem={({ item }) => (
          <View style={{ width }}>
            {item}
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    backgroundColor: 'white',
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CAD5E2',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#F7941D',
  },
});

export default Slider;
