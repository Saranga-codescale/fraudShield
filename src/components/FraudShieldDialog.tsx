import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import colors from 'theme/colors';

interface FraudShieldDialogProps {
  type: 'safe' | 'fraud' | 'feedback';
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const FraudShieldDialog: React.FC<FraudShieldDialogProps> = ({
  type,
  visible,
  onClose,
  title,
  description,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>{title}</Text>
          {type === 'safe' && (
            <Image
              source={require('../assets/icon-okay.png')}
              style={styles.imagePlaceholder}
              resizeMode="contain"
            />
          )}
          {type === 'fraud' && (
            <Image
              source={require('../assets/icon-warning.png')}
              style={styles.imagePlaceholder}
              resizeMode="contain"
            />
          )}
          {type === 'feedback' && (
            <Image
              source={require('../assets/icon-bot.png')}
              style={styles.imagePlaceholder}
              resizeMode="contain"
            />
          )}

          {type && (
            <Text
              style={[
                styles.alertText,
                {
                  color:
                    type === 'safe'
                      ? '#039855'
                      : type === 'fraud'
                      ? '#CD2F2E'
                      : '#004AAD',
                },
              ]}>
              {title}
            </Text>
          )}
          <Text style={styles.messageText}>{description}</Text>

          {(type === 'safe' || type === 'fraud') && (
            <View
              style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
              <Text style={styles.feedbackText}>How did we do?</Text>
              <Image
                source={require('../assets/icon-like.png')}
                style={styles.feedbackImage}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/icon-dislike.png')}
                style={styles.feedbackImage}
                resizeMode="contain"
              />
            </View>
          )}

          {type === 'feedback' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 20,
                width: '100%',
              }}>
              <TouchableOpacity
                style={[styles.okButton, {backgroundColor: '#CD2F2E'}]}
                onPress={onClose}>
                <Text style={styles.okButtonText}>No, Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.okButton, {backgroundColor: '#039855'}]}
                onPress={onClose}>
                <Text style={styles.okButtonText}>Yes, Use it!</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.okButton} onPress={onClose}>
              <Text style={styles.okButtonText}>Okay</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
    width: '89%',
    alignItems: 'center',
  },
  titleText: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginVertical: moderateScale(5),
  },
  subtitleText: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  imagePlaceholder: {
    width: moderateScale(80),
    height: moderateScale(80),
    marginBottom: moderateScale(15),
    backgroundColor: '#E0E0E0',
  },
  alertText: {
    color: '#000000',
    fontSize: moderateScale(20),
    fontWeight: 800,
    marginBottom: moderateScale(15),
  },
  messageText: {
    color: colors.black,
    fontSize: moderateScale(14),
    padding: moderateScale(10),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  feedbackImage: {
    width: 20,
    height: 20,
    marginBottom: moderateScale(15),
    backgroundColor: '#E0E0E0',
  },
  feedbackText: {
    color: colors.black,
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: moderateScale(15),
  },
  okButton: {
    backgroundColor: '#004AAD',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    marginTop: moderateScale(20),
  },
  okButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: 800,
    textAlign: 'center',
  },
});

export default FraudShieldDialog;
