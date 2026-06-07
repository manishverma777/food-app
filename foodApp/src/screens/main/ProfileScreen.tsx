import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../theme/colors';
import {UserProfile} from '../../types/profile';

interface ProfileScreenProps {
  onChangeProfile: (profile: UserProfile) => void;
  profile: UserProfile;
}

export const ProfileScreen = ({
  onChangeProfile,
  profile,
}: ProfileScreenProps) => {
  const [draft, setDraft] = useState(profile);

  const updateField = (field: keyof UserProfile, value: string) => {
    const next = {...draft, [field]: value};
    setDraft(next);
    onChangeProfile(next);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{draft.name}</Text>
          <Text style={styles.email}>{draft.email}</Text>
        </View>

        <View style={styles.formCard}>
          <ProfileField
            label="Name"
            onChangeText={value => updateField('name', value)}
            value={draft.name}
          />
          <ProfileField
            keyboardType="email-address"
            label="Email"
            onChangeText={value => updateField('email', value)}
            value={draft.email}
          />
          <ProfileField
            keyboardType="phone-pad"
            label="Phone"
            onChangeText={value => updateField('phone', value)}
            value={draft.phone}
          />
          <ProfileField
            label="Address"
            multiline
            onChangeText={value => updateField('address', value)}
            value={draft.address}
          />

          <TouchableOpacity activeOpacity={0.84} style={styles.saveButton}>
            <Text style={styles.saveText}>Saved</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface ProfileFieldProps {
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  label: string;
  multiline?: boolean;
  onChangeText: (value: string) => void;
  value: string;
}

const ProfileField = ({
  keyboardType = 'default',
  label,
  multiline,
  onChangeText,
  value,
}: ProfileFieldProps) => (
  <View style={styles.field}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      keyboardType={keyboardType}
      multiline={multiline}
      onChangeText={onChangeText}
      style={[styles.input, multiline && styles.addressInput]}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 22,
  },
  title: {
    color: colors.dark,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    padding: 26,
  },
  avatar: {
    borderRadius: 46,
    height: 92,
    width: 92,
  },
  name: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 14,
  },
  email: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 16,
    padding: 18,
  },
  field: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 7,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.dark,
    fontSize: 16,
    fontWeight: '700',
    minHeight: 50,
    paddingHorizontal: 14,
  },
  addressInput: {
    minHeight: 86,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.greenLight,
    borderRadius: 16,
    justifyContent: 'center',
    minHeight: 44,
  },
  saveText: {
    color: colors.green,
    fontSize: 15,
    fontWeight: '900',
  },
});
