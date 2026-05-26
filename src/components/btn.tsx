import { Host, Button } from '@expo/ui';

export default function BasicButtonExample() {
  return (
    <Host matchContents>
      <Button label="Press me" onPress={() => alert('Pressed!')} />
    </Host>
  );
}
