import { StyleSheet, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { TimeSpan } from "timespan";
import { Button, Portal, Snackbar, useTheme } from "react-native-paper";

const TimeSummary = ({ containerStyle }) => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const { colors } = useTheme();
    const { values, setFieldValue } = useFormikContext();
    if (!values) return null;

    const { splits, mode } = values;
    const totalTimeSpan = splits.reduce((acc, current) => {
        acc.add(current);
        return acc;
    }, new TimeSpan());

    const getTime = (timeSpan) => {
        const hasHours = timeSpan.hours > 0;
        const time =
            `${hasHours ? `${timeSpan.hours}:` : ""}` +
            `${hasHours && timeSpan.minutes < 10 ? `0${timeSpan.minutes}` : timeSpan.minutes}:` +
            `${timeSpan.seconds < 10 ? `0${timeSpan.seconds}` : timeSpan.seconds}.${timeSpan.milliseconds}`;

        return time;
    };

    const totalTime = getTime(totalTimeSpan);

    const copySplits = () => {
        const result = splits.map((s) => getTime(s)).join(" - ");
        Clipboard.setStringAsync(result);

        setFeedbackMessage("Splits and result copied");
        setIsFeedbackOpen(true);
    };

    const copyResult = () => {
        Clipboard.setStringAsync(totalTime);

        setFeedbackMessage("Result copied");
        setIsFeedbackOpen(true);
    };

    const clear = () => {
        Clipboard.setStringAsync("");

        setFieldValue("splits", [new TimeSpan()]);
        setFeedbackMessage("Time splits cleared");
        setIsFeedbackOpen(true);
    };

    return (
        <View style={[styles.summary, containerStyle]}>
            <View style={styles.buttons}>
                <Button icon="content-copy" onPress={copySplits}>
                    Splits
                </Button>
                <Button icon="content-copy" onPress={copyResult}>
                    Result
                </Button>
                <Button icon="block-helper" onPress={clear} textColor={colors.error}>
                    Clear
                </Button>
            </View>
            <Text style={[styles.text, { color: colors.primary }]}>{totalTime}</Text>

            <Portal>
                <Snackbar
                    visible={isFeedbackOpen}
                    onDismiss={() => setIsFeedbackOpen(false)}
                    duration={3000}
                    style={{ backgroundColor: colors.secondary }}
                >
                    {feedbackMessage}
                </Snackbar>
            </Portal>
        </View>
    );
};

export default TimeSummary;

const styles = StyleSheet.create({
    summary: {
        alignItems: "center",
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 25,
        fontWeight: "600",
    },
});
