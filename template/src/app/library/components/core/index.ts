import { Text, View } from 'react-native';

import Animated from 'react-native-reanimated';

export const AnimatedText = Animated.createAnimatedComponent(Text);

export const AnimatedView = Animated.createAnimatedComponent(View);

export { Text, View };
