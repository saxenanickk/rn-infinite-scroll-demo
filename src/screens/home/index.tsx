import React, {FC} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {interpolate} from 'react-native-reanimated';
import {SECOND, THIRD} from '../../assets/imgs';
import LinearGradient from 'react-native-linear-gradient';

const PAGE_WIDTH = Dimensions.get('window').width;

const itemSize = 100;
const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

const Home: FC = () => {
  const animationStyle = React.useCallback((value: number) => {
    'worklet';

    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [0, centerOffset, centerOffset + itemSize * 1.5],
    );

    const translateY = interpolate(value, [-1, 0, 1], [75, 50, 25]);

    const scale = interpolate(value, [-1, 0, 1], [0.75, 1, 0.75]);

    const rotate = interpolate(value, [-1, 0, 1], [-10, 0, 10]);

    return {
      transform: [
        {
          rotate: `${rotate}deg`,
        },
        {
          translateX,
        },
        {
          translateY,
        },
        {scale},
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.0, y: 0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0, 0.33, 0.66, 1.0]}
        colors={['#6F0EEC4F', '#F6109B5D', '#0F50F554', '#F10D0D']}
        style={{}}>
        <Carousel
          width={itemSize}
          height={itemSize}
          style={styles.carousel}
          loop
          data={[SECOND, SECOND, THIRD]}
          renderItem={({item, index}) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={item} style={styles.image} />
            </View>
          )}
          customAnimation={animationStyle}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  carousel: {
    width: PAGE_WIDTH,
    height: PAGE_WIDTH / 2,
  },
  itemContainer: {
    width: itemSize,
    aspectRatio: 4 / 5,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});

export {Home};
