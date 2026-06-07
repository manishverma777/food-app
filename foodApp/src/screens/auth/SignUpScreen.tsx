import React, {useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthTextField} from '../../components/ui/AuthTextField';
import {PrimaryButton} from '../../components/ui/PrimaryButton';
import {colors} from '../../theme/colors';

const authImage = require('../../assets/images/foodie-reference.png');

interface SignUpScreenProps {
  onBack: () => void;
  onCreateAccount: () => void;
}

export const SignUpScreen = ({onBack, onCreateAccount}: SignUpScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground blurRadius={10} source={authImage} style={styles.background}>
      <View style={styles.scrim} />
      <SafeAreaView style={styles.safe}>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboard}
          >
            <View style={styles.topBar}>
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={styles.backText}>‹</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Fresh groceries are one tap away.</Text>

              <View style={styles.form}>
                <AuthTextField
                  autoCapitalize="words"
                  icon="♙"
                  onChangeText={setName}
                  placeholder="Full Name"
                  value={name}
                />
                <AuthTextField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="✉"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  value={email}
                />
                <AuthTextField
                  icon="▣"
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
                  trailingIcon="◌"
                  value={password}
                />
              </View>

              <PrimaryButton onPress={onCreateAccount} title="Sign Up" />

              <TouchableOpacity onPress={onBack} style={styles.loginLink}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrim: {
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  safe: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  backButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  backText: {
    color: colors.white,
    fontSize: 44,
    lineHeight: 44,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 34,
    marginTop: 8,
    opacity: 0.9,
    textAlign: 'center',
  },
  form: {
    gap: 16,
    marginBottom: 28,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 22,
  },
  loginText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
