import { StatusBar } from 'expo-status-bar';
import urid from 'urid';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView
} from 'react-native';
import { useRef, useState } from 'react';

export default function App() {
  const [minute, setMinute] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [hour, setHour] = useState('00');
  const [cron, setCron] = useState(false);
  const [laps, setLaps] = useState([]);

  const timerRef = useRef(null);

  let minNum = 0
  let segNum = 0
  let houNum = 0

  function start() {
    restart();
    setCron(true);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { timer(); }, 1000);
  }

  function restart() {
    setCron(false);
    setHour('00');
    setSeconds('00');
    setMinute('00');
    segNum = 0;
    minNum = 0;
    hourNum = 0;

    setLaps([]);
  }

  function stop() {
    clearInterval(timerRef.current);
    setCron(false);
  }

  function timer() {
    if ((segNum += 1) == 60) {
      segNum = 0;
      minNum++;
    }

    if (minNum == 60) {
      minNum = 0;
      houNum++;
    }

    setSeconds(displayNumber(segNum))
    setMinute(displayNumber(minNum))
    setHour(displayNumber(houNum))
  }

  function displayNumber(input) {
    return input >= 10 ? input : `0${input}`;
  }

  async function createLap() {
    const lap = { id: urid(4, 'num'), moment: `${hour}:${minute}:${seconds}` }

    setLaps([lap, ...laps]);
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.watchView}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#FEE400", fontSize: 50 }}>{hour}</Text>
          <Text style={{ color: "#6F7281", fontSize: 50 }}>.</Text>
          <Text style={{ color: "#FEE400", fontSize: 50 }}>{minute}</Text>
          <Text style={{ color: "#6F7281", fontSize: 50 }}>.</Text>
          <Text style={{ color: "#FEE400", fontSize: 50 }}>{seconds}</Text>
        </View>
      </View>

      <ScrollView style={styles.lapView}      >
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {laps.map((lap, key) => (
            <Text style={{ color: "#FEE400", fontSize: 20 }} key={key}>{lap.moment}</Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonView}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {!cron ? (
            <Pressable style={styles.button} onPress={() => start()}>
              <View>
                <Text style={{ color: "#FEE400", fontSize: 20 }}>START</Text>
              </View>
            </Pressable>
          ) : (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Pressable style={styles.button} onPress={() => createLap()}>
                <View>
                  <Text style={{ color: "#FEE400", fontSize: 20 }}>LAP</Text>
                </View>
              </Pressable>

              <Pressable style={styles.button} onPress={() => stop()}>
                <View>
                  <Text style={{ color: "#FEE400", fontSize: 20 }}>STOP</Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  watchView: {
    backgroundColor: "#1A1F39",
    flex: 2
  },

  lapView: {
    backgroundColor: "#1A1F39",
    flex: 3
  },

  buttonView: {
    backgroundColor: "#7cb48f",
    flex: 1,
  },

  button: {
    backgroundColor: "#1A1F39",
    flex: 1, alignItems: "center",
    justifyContent: "center"
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    paddingBottom: 50
  }
});
