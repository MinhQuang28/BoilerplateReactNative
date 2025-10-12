/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnimatableValue,
  Animation,
  AnimationObject,
  defineAnimation,
  SharedValue,
} from 'react-native-reanimated';

import { HigherOrderAnimation } from 'react-native-reanimated/lib/typescript/animation/commonTypes';
import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';

type SharePauseType = <T extends AnimatableValue>(
  nextAnimation: T,
  paused: SharedValue<boolean>,
) => T;
interface PausedAnimation
  extends Animation<PausedAnimation>,
    HigherOrderAnimation {
  startTime: Timestamp;
  started: boolean;
  previousAnimation: PausedAnimation | null;
  current: AnimatableValue;
}

export const sharePause = function <T extends AnimationObject>(
  _nextAnimation: T | (() => T),
  paused: SharedValue<boolean>,
) {
  'worklet';

  return defineAnimation<PausedAnimation, T>(
    _nextAnimation,
    (): PausedAnimation => {
      'worklet';
      const nextAnimation: any =
        typeof _nextAnimation === 'function'
          ? _nextAnimation()
          : _nextAnimation;

      const onFrame = (state: any, now: number) => {
        const { lastTimestamp, elapsed } = state;

        if (paused.value) {
          state.elapsed = now - lastTimestamp;

          return false;
        }

        const dt = now - elapsed;

        const finished = nextAnimation.onFrame(nextAnimation, dt);

        state.current = nextAnimation.current;

        state.lastTimestamp = dt;

        return finished;
      };

      const onStart = (
        state: any,
        value: AnimatableValue,
        now: number,
        previousState: any,
        // eslint-disable-next-line max-params
      ) => {
        state.lastTimestamp = now;

        state.elapsed = 0;

        state.current = 0;

        nextAnimation.onStart(nextAnimation, value, now, previousState);
      };

      const callback = (finished?: boolean): void => {
        if (nextAnimation.callback) {
          nextAnimation.callback(finished);
        }
      };

      return {
        callback,
        current: nextAnimation.current,
        elapsed: 0,
        isHigherOrder: true,
        lastTimestamp: 0,
        onFrame,
        onStart,
        previousAnimation: null,
        startTime: 0,
        started: false,
      };
    },
  );
} as SharePauseType;
