import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  cancelAnimation,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

interface IData {
  id: number;
  name: string;
}

const ITEM_HEIGHT = 70;
const SCROLL_HEIGHT_TRESHOLD = ITEM_HEIGHT;

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  "worklet";
  return Math.max(lowerBound, Math.min(value, upperBound));
};

const shuffle = (array: IData[]) => {
  let counter = array.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

const objectMove = (object: any, from: number, to: number) => {
  "worklet";
  const newObject = { ...object };

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
};

const listToObject = (list: IData[]) => {
  const values = Object.values(list);
  const object: any = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
};

const NOTES = shuffle([
  { id: 1, name: "Test" },
  { id: 2, name: "Test1" },
  { id: 3, name: "Test3" },
  { id: 4, name: "Test4" },
  { id: 5, name: "Test5" },
  { id: 6, name: "Test6" },
]);

type Prop = {
  name: string;
};

const Collection: React.FC<Prop> = ({ name }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: ITEM_HEIGHT,
        padding: 10,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

interface IProps {
  id: number;
  name: string;
  positions: Animated.SharedValue<any>;
  scrollY: Animated.SharedValue<number>;
  notesCount: number;
}

const MovableCollection: React.FC<IProps> = ({
  id,
  name,
  positions,
  scrollY,
  notesCount,
}) => {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * ITEM_HEIGHT);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * ITEM_HEIGHT);
        }
      }
    },
    [moving]
  );
  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(() => setMoving(true));
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_TRESHOLD) {
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (
        positionY >=
        scrollY.value + dimensions.height - SCROLL_HEIGHT_TRESHOLD
      ) {
        const contentHight = notesCount * ITEM_HEIGHT;
        const containerHight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHight - containerHight;
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - ITEM_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(
        Math.floor(positionY / ITEM_HEIGHT),
        0,
        notesCount - 1
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition
        );
      }
    },
    onFinish() {
      top.value = positions.value[id] * ITEM_HEIGHT;
      runOnJS(() => setMoving(false));
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: top.value,
      backgroundColor: "white",
      zIndex: moving ? 1 : 0,
      shadowColor: "black",
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{ maxWidth: "80%" }}>
          <Collection name={name} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export const TestFunction: React.FC = () => {
  const positions = useSharedValue(listToObject(NOTES));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{
              flex: 1,
              position: "relative",
              backgroundColor: "white",
            }}
            contentContainerStyle={{
              height: NOTES.length * ITEM_HEIGHT,
            }}
          >
            {NOTES.map((note) => (
              <MovableCollection
                key={String(note.id)}
                id={note.id}
                name={note.name}
                positions={positions}
                scrollY={scrollY}
                notesCount={NOTES.length}
              />
            ))}
          </Animated.ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};
