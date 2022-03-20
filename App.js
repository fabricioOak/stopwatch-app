import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

let timerWatch = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

export default function App() {
	const [timer, setTimer] = useState(0);
	const [text, setText] = useState("Iniciar");
	const [lastTimer, setLastTimer] = useState(null);

	function startTimer() {
		if (timerWatch !== null) {
			clearInterval(timerWatch);
			setText("Iniciar");
			timerWatch = null;
		} else {
			timerWatch = setInterval(() => {
				seconds++;
				if (seconds === 60) {
					seconds = 0;
					minutes++;
				}
				if (minutes === 60) {
					minutes = 0;
					hours++;
				}

				let formatTime =
					(hours < 10 ? "0" + hours : hours) +
					":" +
					(minutes < 10 ? "0" + minutes : minutes) +
					":" +
					(seconds < 10 ? "0" + seconds : seconds);

				setTimer(formatTime);
			}, 1000);
			setText("Parar");
		}
	}

	function clearTimer() {
		setLastTimer(timer);
		clearInterval(timerWatch);
		seconds = 0;
		minutes = 0;
		hours = 0;
		setTimer(0);
		setText("Iniciar");
		timerWatch = null;
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Image source={require("./src/assets/image/crono.png")} />
			<Text style={styles.timer}>{timer === 0 ? "00:00:00" : timer}</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={startTimer} style={styles.button}>
					<Text style={styles.buttonText}>{text}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={clearTimer} style={styles.button}>
					<Text style={styles.buttonText}>Zerar</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Text style={[styles.buttonText, { marginTop: 40 }]}>
					{lastTimer ? `Último tempo: ${lastTimer}` : null}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#666",
		alignItems: "center",
		justifyContent: "center",
	},
	timer: {
		fontSize: 50,
		color: "#fff",
		fontWeight: "bold",
		marginTop: -170,
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 130,
	},
	button: {
		borderColor: "#fff",
		borderWidth: 2,
		borderRadius: 10,
		marginHorizontal: 10,
	},
	buttonText: {
		textAlign: "center",
		fontWeight: "bold",
		color: "#fff",
		fontSize: 20,
		padding: 6,
		marginHorizontal: 10,
		marginVertical: 2,
	},
});
