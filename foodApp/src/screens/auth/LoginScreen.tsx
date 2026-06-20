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

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: () => void;
}

export const LoginScreen = ({onLogin, onSignUp}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(email.trim(), password);
  };

  return (
    <ImageBackground blurRadius={9} source={authImage} style={styles.background}>
      <View style={styles.scrim} />
      <SafeAreaView style={styles.safe}>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboard}
          >
            <View style={styles.content}>
              <View style={styles.brandWrap}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>F</Text>
                </View>
                <Text style={styles.brand}>FoodieFresh</Text>
              </View>

              <Text style={styles.title}>Welcome Back!</Text>

              <View style={styles.form}>
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

              <PrimaryButton onPress={handleLogin} title="Login" />

              <TouchableOpacity onPress={() => {}} style={styles.forgot}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onSignUp} style={styles.signup}>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.or}>or</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity activeOpacity={0.86} style={styles.google}>
                <Text style={styles.googleMark}>G</Text>
                <Text style={styles.socialText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.86} style={styles.apple}>
                <Text style={styles.appleMark}>●</Text>
                <Text style={[styles.socialText, styles.appleText]}>
                  Continue with Apple
                </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
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
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  brandWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 54,
  },
  logo: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    height: 38,
    justifyContent: 'center',
    marginRight: 8,
    width: 38,
  },
  logoText: {
    color: colors.greenDark,
    fontSize: 26,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  brand: {
    color: colors.white,
    fontSize: 27,
    fontWeight: '900',
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 48,
    textAlign: 'center',
  },
  form: {
    gap: 16,
    marginBottom: 28,
  },
  forgot: {
    alignItems: 'center',
    marginTop: 18,
  },
  forgotText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  signup: {
    alignItems: 'center',
    marginTop: 22,
  },
  signupText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginVertical: 22,
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    flex: 1,
    height: 1,
  },
  or: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  google: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 56,
  },
  apple: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 56,
  },
  googleMark: {
    color: '#4285F4',
    fontSize: 21,
    fontWeight: '900',
    marginRight: 12,
  },
  appleMark: {
    color: colors.white,
    fontSize: 18,
    marginRight: 12,
  },
  socialText: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '800',
  },
  appleText: {
    color: colors.white,
  },
});
