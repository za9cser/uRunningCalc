import { View } from "react-native";
import React from "react";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

const ModeSelect = ({ value, buttons, onChange, multiSelect }) => {
    const { colors } = useTheme();
    const isActiveButton = (buttonValue) => (multiSelect ? value.includes(buttonValue) : value === buttonValue);

    const handlePress = (buttonValue) => {
        console.log("buttonValue", buttonValue);
        if (multiSelect) {
            const index = value.indexOf(buttonValue);
            const newValue = [...value];
            if (index >= 0) newValue.splice(index, 1);
            else newValue.push(buttonValue);

            onChange(newValue);
        } else onChange(buttonValue);
    };

    return (
        <View style={{ flexDirection: "row", gap: 22 }}>
            {buttons.map((button) => {
                const isActive = isActiveButton(button.value);
                return (
                    <TouchableRipple
                        key={button.value}
                        style={{ backgroundColor: isActive ? colors.surfaceVariant : "transparent" }}
                        onPress={() => handlePress(button.value)}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                            }}
                        >
                            <Text>{button.label}</Text>
                        </View>
                    </TouchableRipple>
                );
            })}
        </View>
    );
};

export default ModeSelect;