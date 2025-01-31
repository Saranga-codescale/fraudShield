import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutChangeEvent,
  Modal,
} from 'react-native';

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  {label: 'Model 1', value: 'model1'},
  {label: 'Model 2', value: 'model2'},
  {label: 'Model 3', value: 'model3'},
  {label: 'Model 4', value: 'model4'},
  {label: 'Model 5', value: 'model5'},
  {label: 'Model 6', value: 'model6'},
  {label: 'Model 7', value: 'model7'},
];

interface Props {
  selectedValue: string;
  onSelect: (value: string) => void;
}

const CustomDropdown: React.FC<Props> = ({selectedValue, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState<number>(0);
  const dropdownRef = useRef<View>(null);

  // Get button position to position dropdown
  const handleLayout = (event: LayoutChangeEvent) => {
    dropdownRef.current?.measure((_fx, _fy, _width, height, _px, py) => {
      setDropdownTop(py + height);
    });
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity
        ref={dropdownRef}
        style={styles.dropdown}
        onPress={() => setVisible(!visible)}
        onLayout={handleLayout}>
        <Text style={styles.text}>
          {selectedValue
            ? options.find(opt => opt.value === selectedValue)?.label
            : 'Select a Model'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        />
        <View style={[styles.dropdownContainer, {top: dropdownTop}]}>
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}>
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            )}
            style={{maxHeight: 190}}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {margin: 10, width: '100%'},
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#D1F0FF',
    width: '100%',
  },
  text: {fontSize: 16, color: '#444'},
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: '#64C8FF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1000,
    alignSelf: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#B3E7FF',
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
