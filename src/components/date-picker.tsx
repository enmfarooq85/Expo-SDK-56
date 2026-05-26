import { useState } from 'react';
import { Host, Column, Picker } from '@expo/ui';

const FLAVOURS = [
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
];

export default function PickerWheelExample() {
  const [value, setValue] = useState('chocolate');

  return (
    <Host style={{ flex: 1 }}>
      <Column spacing={8} style={{ padding: 16 }}>
        <Picker selectedValue={value} onValueChange={setValue} appearance="wheel">
          {FLAVOURS.map(f => (
            <Picker.Item key={f.value} label={f.label} value={f.value} />
          ))}
        </Picker>
      </Column>
    </Host>
  );
}
