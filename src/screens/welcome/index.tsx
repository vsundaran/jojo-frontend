import React, { useRef } from 'react';
import { Button, Surface, Text } from 'react-native-paper';
import Container from '../../automic-elements/container';
import { View } from 'react-native';
import JojoCarousel from '../../automic-elements/slider';

export default function Welcome({ navigation }: any) {
  const carouselRef = useRef<any>(null);
  return (
    <Container>
      <Surface
        style={{
          backgroundColor: 'white',
          elevation: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
        }}
      >
        <Surface
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            elevation: 0,
          }}
        >
          <Button
            mode="text"
            onPress={() => navigation.navigate('login')}
            style={{
              padding: 0,
              margin: 0,
              elevation: 0,
            }}
          >
            Skip
          </Button>
        </Surface>
        <View
          style={{
            marginTop: 120,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              // marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <JojoCarousel ref={carouselRef} />
          </View>
        </View>
        <View
          style={{
            marginTop: 180,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            icon="arrow-right"
            mode="contained"
            onPress={() => carouselRef.current?.goNext()}
            style={{ width: 300, borderRadius: 10 }}
            contentStyle={{ flexDirection: 'row-reverse' }}
          >
            Next
          </Button>
        </View>
      </Surface>
    </Container>
  );
}
