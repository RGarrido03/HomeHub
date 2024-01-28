import dayjs from "dayjs";
import { JSX, useEffect, useState } from "react";
import { Animated, Text } from "react-native";

import View = Animated.View;

export default function Clock(): JSX.Element {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setDate(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <Text
        style={{
          color: "#fff",
          opacity: 0.8,
          fontWeight: "700",
          fontSize: 64,
        }}
      >
        {date.format("HH:mm")}
      </Text>
      <Text style={{ color: "#fff", opacity: 0.7, fontSize: 24 }}>
        {date.format("dddd, DD MMMM")}
      </Text>
    </View>
  );
}
