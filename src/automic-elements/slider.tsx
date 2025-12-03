import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import WelcomeScreen from '../screens/welcome/welcome';
import MomentsScreen from '../screens/welcome/moments';
import GiveJoyScreen from '../screens/welcome/giveGoy';
import SafePrivateScreen from '../screens/welcome/safePrivate';

const { width } = Dimensions.get('window');

const sliderItems = [
  <View style={{ flex: 1, justifyContent: 'center', width: "100%", }}>
    <WelcomeScreen />
  </View>,
  <View style={{ flex: 1, justifyContent: 'center', width: "100%" }}>
    <MomentsScreen />
  </View>,
  <View style={{ flex: 1, justifyContent: 'center', width: "100%", paddingHorizontal: 20 }}>
    <GiveJoyScreen />
  </View>,
  <View style={{ flex: 1, justifyContent: 'center', width: "100%", paddingHorizontal: 20 }}>
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

interface SliderProps {
  onDone?: () => void;
  onChangeIndex?: (index: number) => void;
}

const Slider = React.forwardRef<any, SliderProps>((props, ref) => {
  const swiperRef = React.useRef<SwiperFlatList>(null);

  React.useImperativeHandle(ref, () => ({
    goNext: () => {
      if (swiperRef.current) {
        const currentIndex = swiperRef.current.getCurrentIndex();
        if (currentIndex === sliderItems.length - 1) {
          if (props.onDone) {
            props.onDone();
          }
        } else {
          const nextIndex = currentIndex + 1;
          swiperRef.current.scrollToIndex({ index: nextIndex });
        }
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
        onChangeIndex={({ index }) => {
          if (props.onChangeIndex) {
            props.onChangeIndex(index);
          }
        }}
        PaginationComponent={({ paginationIndex }) => (
          <CustomPagination
            paginationIndex={paginationIndex}
            data={sliderItems}
          />
        )}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1, justifyContent: 'center' }}>
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
    flex: 1, // Use flex: 1 instead of fixed height
    backgroundColor: 'white',
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Add margin bottom for spacing
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
