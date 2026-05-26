import { useState } from 'react';
import { Platform } from 'react-native';
import { Picker } from '@expo/ui/community/picker';

const monospace = Platform.select({ ios: 'Menlo', android: 'monospace' });
const serif = Platform.select({ ios: 'Georgia', android: 'serif' });

export default function StyledPickerExample() {
  const [language, setLanguage] = useState('java');

  return (
    <Picker selectedValue={language} onValueChange={value => setLanguage(value)}>
      <Picker.Item
        label="Java"
        value="java"
        style={{ color: '#e11d48', fontFamily: monospace, fontSize: 14 }}
      />
      <Picker.Item
        label="JavaScript"
        value="js"
        style={{ color: '#2563eb', fontFamily: serif, fontSize: 18 }}
        enabled={false}
      />
      <Picker.Item
        label="Objective C"
        value="objc"
        style={{ color: '#059669', fontFamily: monospace, fontSize: 16 }}
      />
      <Picker.Item
        label="Swift"
        value="swift"
        style={{ color: '#d97706', fontFamily: serif, fontSize: 30 }}
        enabled={false}
      />
    </Picker>
  );
}
