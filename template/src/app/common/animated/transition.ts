import { useEffect } from 'react';

import {
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

import { sharedBin } from './math';

/**
 * Return value runs from 0 to 1 when state change using withTiming
 */
export const useSharedTransition = (
  state: boolean | number,
  config?: WithTimingConfig,
  initialValue?: number,
): SharedValue<number> => {
  const value = useSharedValue(initialValue ?? 0);

  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);

  return useDerivedValue(() =>
    withTiming(value.value, {
      duration: 500,
      easing: Easing.bezier(0.33, 0.01, 0, 1),
      ...(config ?? {}),
    }),
  );
};
