import dayjs from "dayjs";
import { JSX, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
      <Text style={[styles.shadow, styles.hours]}>{date.format("HH:mm")}</Text>
      <Text style={[styles.shadow, styles.date]}>
        {date.format("dddd, DD MMMM")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    padding: 8,
    margin: -8,
  },
  hours: {
    color: "#fff",
    opacity: 0.8,
    fontWeight: "700",
    fontSize: 64,
  },
  date: { color: "#fff", opacity: 0.7, fontSize: 24 },
});
