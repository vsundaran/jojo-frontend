// // import React from 'react';
// // import { Text, Dimensions, StyleSheet, View } from 'react-native';
// // import { SwiperFlatList } from 'react-native-swiper-flatlist';

// // const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

// // const Slider = () => (
// //   <View style={styles.container}>
// //     <SwiperFlatList
// //       //   autoplay
// //       autoplayDelay={2}
// //       autoplayLoop
// //       index={2}
// //       showPagination
// //       data={colors}
// //       renderItem={({ item }) => (
// //         <View style={[styles.child, { backgroundColor: item }]}>
// //           <Text style={styles.text}>{item}</Text>
// //         </View>
// //       )}
// //     />
// //   </View>
// // );

// // const { width } = Dimensions.get('window');
// // const styles = StyleSheet.create({
// //   container: { height: 40, backgroundColor: 'white' },
// //   child: { width, justifyContent: 'center' },
// //   text: { fontSize: width * 0.5, textAlign: 'center' },
// // });

// // export default Slider;

// import React from 'react';
// import { Dimensions, StyleSheet, View } from 'react-native';
// import { SwiperFlatList } from 'react-native-swiper-flatlist';
// import WelcomeScreen from '../screens/welcome/welcome';
// import MomentsScreen from '../screens/welcome/moments';
// import GiveJoyScreen from '../screens/welcome/giveGoy';
// import SafePrivateScreen from '../screens/welcome/safePrivate';

// const { width } = Dimensions.get('window');

// const sliderItems = [
//   <WelcomeScreen />,
//   <MomentsScreen />,
//   <GiveJoyScreen />,
//   <SafePrivateScreen />,
// ];

// const Slider = () => (
//   <View style={styles.container}>
//     <SwiperFlatList
//       autoplay
//       autoplayDelay={2}
//       autoplayLoop
//       index={0}
//       showPagination
//       data={sliderItems}
//       renderItem={({ item }) => <View style={{ width }}>{item}</View>}
//     />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     height: 400,
//     backgroundColor: 'white',
//   },
// });

// export default Slider;

// import React from 'react';
// import { Dimensions, StyleSheet, View } from 'react-native';
// import { SwiperFlatList } from 'react-native-swiper-flatlist';

// import WelcomeScreen from '../screens/welcome/welcome';
// import MomentsScreen from '../screens/welcome/moments';
// import GiveJoyScreen from '../screens/welcome/giveGoy';
// import SafePrivateScreen from '../screens/welcome/safePrivate';

// const { width } = Dimensions.get('window');

// const sliderItems = [
//   <WelcomeScreen />,
//   <MomentsScreen />,
//   <GiveJoyScreen />,
//   <SafePrivateScreen />,
// ];

// const CustomPagination = ({ paginationIndex, data }: any) => {
//   return (
//     <View style={styles.paginationContainer}>
//       {data.map((_: any, index: number) => (
//         <View
//           key={index}
//           style={[styles.dot, paginationIndex === index && styles.activeDot]}
//         />
//       ))}
//     </View>
//   );
// };

// const Slider = () => (
//   <View style={styles.container}>
//     <SwiperFlatList
//       autoplay
//       autoplayDelay={2}
//       autoplayLoop
//       index={0}
//       data={sliderItems}
//       showPagination
//       PaginationComponent={({ paginationIndex }) => (
//         <CustomPagination
//           paginationIndex={paginationIndex}
//           data={sliderItems}
//         />
//       )}
//       renderItem={({ item }) => <View style={{ width }}>{item}</View>}
//     />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     height: 400,
//     backgroundColor: 'white',
//   },

//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//   },

//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#CAD5E2', // inactive
//     marginHorizontal: 4,
//   },

//   activeDot: {
//     backgroundColor: '#F7941D', // active
//   },
// });

// export default Slider;

import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import WelcomeScreen from '../screens/welcome/welcome';
import MomentsScreen from '../screens/welcome/moments';
import GiveJoyScreen from '../screens/welcome/giveGoy';
import SafePrivateScreen from '../screens/welcome/safePrivate';

const { width } = Dimensions.get('window');

const sliderItems = [
  <WelcomeScreen />,
  <MomentsScreen />,
  <GiveJoyScreen />,
  <SafePrivateScreen />,
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

const Slider = () => (
  <View style={styles.container}>
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={0}
      data={sliderItems}
      showPagination
      // ⭐ FIXES
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
        <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
          {item}
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
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
