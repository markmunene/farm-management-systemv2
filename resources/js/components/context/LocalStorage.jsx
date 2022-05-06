import React, { useState } from "react";

export default function LocalStorage(KeyName, defaultValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const Value = window.localStorage.getItem(KeyName);
            if (Value) {
                return JSON.parse(Value);
            } else {
                window.localStorage.setItem(
                    KeyName,
                    JSON.stringify(defaultValue)
                );
                return defaultValue;
            }
        } catch (error) {
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(KeyName, JSON.stringify(newValue));
        } catch (error) {
            console.log(error);
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
}
