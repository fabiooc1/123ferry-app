import { colors } from "@/constants/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
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

interface FormFieldProps extends TextInputProps {
  label: string;
  type?: "text" | "password" | "email" | "number" | "date" | "plate";
  error?: string;
  mask?: string;
  disabled?: boolean;
  useBottomSheet?: boolean;
}

// Função auxiliar para aplicar máscara manualmente
const applyMask = (text: string, mask: string): string => {
  if (!mask || !text) return text;
  
  let maskedText = "";
  let textIndex = 0;
  
  for (let i = 0; i < mask.length && textIndex < text.length; i++) {
    if (mask[i] === "9") {
      // Aceita apenas números
      if (/\d/.test(text[textIndex])) {
        maskedText += text[textIndex];
        textIndex++;
      } else {
        textIndex++;
        i--;
      }
    } else if (mask[i] === "A") {
      // Aceita apenas letras
      if (/[a-zA-Z]/.test(text[textIndex])) {
        maskedText += text[textIndex];
        textIndex++;
      } else {
        textIndex++;
        i--;
      }
    } else if (mask[i] === "S") {
      // Aceita letras e números
      if (/[a-zA-Z0-9]/.test(text[textIndex])) {
        maskedText += text[textIndex];
        textIndex++;
      } else {
        textIndex++;
        i--;
      }
    } else {
      // Caractere fixo da máscara
      maskedText += mask[i];
    }
  }
  
  return maskedText;
};

const removeMask = (text: string, mask?: string): string => {
  if (!mask) return text;
  return text.replace(/[^a-zA-Z0-9]/g, "");
};

export default function FormField({
  label,
  type = "text",
  error,
  mask,
  value,
  onChangeText,
  disabled = false,
  useBottomSheet = false,
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
    inputProps.keyboardType = "numeric";
  } else if (type === "plate") {
    inputProps.autoCapitalize = "characters";
  }

  const hasError = !!error;
  const iconColor = disabled
    ? colors.text.placeholder
    : hasError
    ? colors.status.danger
    : colors.text.secondary;

  // Handler para inputs com máscara
  const handleMaskedChange = (text: string) => {
    if (!onChangeText) return;
    
    const activeMask = type === "date" ? "99/99/9999" : mask;
    
    if (activeMask) {
      const rawText = removeMask(text, activeMask);
      const maskedText = applyMask(rawText, activeMask);
      onChangeText(maskedText);
    } else {
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

  const InputComponent = useBottomSheet ? BottomSheetTextInput : TextInput;
  const hasMask = !!(type === "date" || mask);

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
        <InputComponent
          style={[
            s.input,
            hasError && s.inputError,
            disabled && s.inputDisabled,
          ]}
          value={value}
          onChangeText={hasMask ? handleMaskedChange : onChangeText}
          placeholderTextColor={colors.text.placeholder}
          {...inputProps}
          {...props}
          editable={!disabled}
        />

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
    color: colors.status.danger,
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
    color: colors.status.danger,
    borderColor: colors.status.danger,
  },
  errorText: {
    color: colors.status.danger,
    fontSize: 12,
  },
});