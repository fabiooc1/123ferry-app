import { colors } from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

type Option = {
  label: string;
  value: string | number;
};

interface SelectFieldProps {
  label: string;
  error?: string;
  options: Option[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  placeholder?: string;
}

export default function SelectField({
  label,
  error,
  options = [],
  placeholder,
  selectedValue,
  onValueChange
}: SelectFieldProps) {
  
  const hasError = !!error;

  return (
    <View style={s.container}>
      <Text style={[s.label, hasError && s.labelError]}>{label}</Text>
      <View style={[s.inputContainer, hasError && s.inputError]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={s.picker}
        >
          {placeholder && (
            <Picker.Item 
              label={placeholder} 
              value="" 
              style={s.placeholderItem} 
            />
          )}
          {options.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value} 
            />
          ))}
        </Picker>
      </View>
      {hasError && <Text style={s.errorText}>{error}</Text>}
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
    color: colors.text.placeholder,
  },
  labelError: {
    color: colors.status.danger,
  },
  inputContainer: {
    width: '100%',
    borderRadius: 12,
    borderColor: colors.border.primary,
    borderWidth: 2,
    backgroundColor: colors.bg.secondary,
    paddingHorizontal: 6
  },
  inputError: {
    borderColor: colors.status.danger,
  },
  picker: {
    color: colors.text.tertiary,
    fontFamily: "Inter-Bold",
    fontSize: 14,
    width: '100%',
  },
  placeholderItem: {
    color: colors.text.placeholder,
    fontFamily: "Inter-Bold",
    fontSize: 14,
  },
  errorText: {
    color: colors.status.danger,
    fontSize: 12,
  }
});