import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export default function GradientText({
  children,
  style,
}: {
  children: string;
  style?: any;
}) {
  return (
    <MaskedView maskElement={<Text style={style}>{children}</Text>}>
      <LinearGradient
        colors={['#155DFC', '#9810FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* This View defines the area for the gradient */}
        <View>
          <Text style={[style, { opacity: 0 }]}>{children}</Text>
        </View>
      </LinearGradient>
    </MaskedView>
  );
}
