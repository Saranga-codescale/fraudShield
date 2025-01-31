import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import FraudShieldDialog from '../components/FraudShieldDialog';
import CustomDropdown from '../components/CustomDropdown';

const FraudShieldScreen: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<'safe' | 'fraud' | 'feedback'>('safe');
  const [title, setTitle] = useState<string>('No title');
  const [description, setDescription] = useState<string>('No description');
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);

  const handlePressButton = () => {
    if (message === 'okay') {
      setType('safe');
      setTitle('SAFE MESSAGE!');
      setDescription(
        'No fraud detected. Stay cautious and verify sender details if unsure.',
      );
      setVisible(true);
    } else {
      setType('fraud');
      setTitle('FRAUD DETECTED!');
      setDescription(
        'This message appears to be fraudulent. Do not respond or share personal details!',
      );
      setVisible(true);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setFeedbackVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Image
            source={require('../assets/icon-logo.png')}
            style={styles.imageLogo}
          />
          <Text style={styles.title}>FraudShield</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        Protecting users from financial fraud.
      </Text>
      <Image source={require('../assets/Fraud.png')} style={styles.image} />
      <Text style={styles.description}>
        Received a suspicious message? Stay calm and verify it instantly!
      </Text>
      {/* Dropdown */}
      <Text style={styles.label}>Select Fraud Detection Model</Text>
      <CustomDropdown
        selectedValue={selectedModel}
        onSelect={setSelectedModel}
      />
      <Text style={styles.label}>Paste or Type Suspicious Message Here</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter Message Here..."
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handlePressButton}
          style={styles.button}>
          Check for Fraud
        </Button>
      </View>
      <FraudShieldDialog
        type={type}
        visible={visible}
        onClose={handleClose}
        title={title}
        description={description}
      />
      <FraudShieldDialog
        type={'feedback'}
        visible={feedbackVisible}
        onClose={() => setFeedbackVisible(false)}
        title={'Help Improve FraudShield!'}
        description={
          'Would you like to allow us to use this message to improve our fraud detection system? Your data will be anonymized and used only for training purposes.'
        }
      />
    </ScrollView>
  );
};

export default FraudShieldScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#004AAD',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  imageLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
    resizeMode: 'contain',
  },
  image: {
    width: 193,
    height: 193,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  pickerWrapper: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#E3F2FD',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 10,
  },
  button: {
    height: 40,
    borderRadius: 8,
    width: '50%',
    backgroundColor: '#004AAD',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    height: 170,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    backgroundColor: '#E3F2FD',
    width: '100%',
  },
});
