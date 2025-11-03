import { colors } from "@/constants/colors";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarIcon, EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

interface FormFieldProps extends TextInputProps {
  label: string;
  type?: "text" | "password" | "email" | "number" | "date" | "plate";
  error?: string;
  mask?: string;
  disabled?: boolean;
}

export default function FormField({
  label,
  type = "text",
  error,
  mask,
  value,
  onChangeText,
  disabled = false,
  ...props
}: FormFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const inputProps: TextInputProps = {
    keyboardType: "default",
    secureTextEntry: false,
    autoCapitalize: "sentences",
  };

  if (type === "email") {
    inputProps.keyboardType = "email-address";
    inputProps.autoCapitalize = "none";
  } else if (type === "password") {
    inputProps.secureTextEntry = !isPasswordVisible;
  } else if (type === "number" || type === "date") {
  } else if (type === "plate") {
    inputProps.autoCapitalize = "characters";
  }

  const hasError = !!error;
  const iconColor = disabled
    ? colors.text.placeholder
    : hasError
    ? colors.status.error
    : colors.text.secondary;

  const handleMaskedChange = (text: string, rawText: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate && onChangeText) {
      const formattedDate = selectedDate.toLocaleDateString("pt-BR");
      onChangeText(formattedDate);
    }
  };

  const dateMask = "99/99/9999";
  const activeMask = type === "date" ? dateMask : mask;

  const getDateValue = () => {
    if (!value || typeof value !== "string") return new Date();
    const parts = value.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      if (day && month && year) {
        const parsedDate = new Date(year, month - 1, day);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }
    return new Date();
  };

  return (
    <View style={s.container}>
      <Text
        style={[s.label, hasError && s.labelError, disabled && s.labelDisabled]}
      >
        {label}
      </Text>
      <View
        style={[
          s.inputContainer,
          hasError && s.inputError,
          disabled && s.inputContainerDisabled,
        ]}
      >
        {activeMask ? (
          <MaskedTextInput
            style={[
              s.input,
              hasError && s.inputError,
              disabled && s.inputDisabled,
            ]}
            value={value}
            placeholderTextColor={colors.text.placeholder}
            {...inputProps}
            {...props}
            mask={activeMask}
            onChangeText={handleMaskedChange}
            editable={!disabled}
          />
        ) : (
          <TextInput
            style={[
              s.input,
              hasError && s.inputError,
              disabled && s.inputDisabled,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={colors.text.placeholder}
            {...inputProps}
            {...props}
            editable={!disabled}
          />
        )}

        {type === "password" && (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeIcon size={20} color={iconColor} style={s.inputRightIcon} />
            ) : (
              <EyeSlashIcon
                size={20}
                color={iconColor}
                style={s.inputRightIcon}
              />
            )}
          </TouchableOpacity>
        )}

        {type === "date" && (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setShowDatePicker(true)}
          >
            <CalendarIcon
              size={20}
              color={iconColor}
              style={s.inputRightIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {hasError && <Text style={s.errorText}>{error}</Text>}

      {showDatePicker && (
        <DateTimePicker
          value={getDateValue()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.text.secondary,
  },
  labelError: {
    color: colors.status.error,
  },
  labelDisabled: {
    color: colors.text.placeholder,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    borderColor: colors.border.primary,
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.bg.secondary,
  },
  inputContainerDisabled: {
    opacity: 0.5,
  },
  input: {
    color: colors.text.tertiary,
    fontSize: 14,
    fontFamily: "Inter-Bold",
    flex: 1,
  },
  inputDisabled: {
    color: colors.text.placeholder,
  },
  inputRightIcon: {
    marginLeft: 8,
  },
  inputError: {
    color: colors.status.error,
    borderColor: colors.status.error,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 12,
  },
});
