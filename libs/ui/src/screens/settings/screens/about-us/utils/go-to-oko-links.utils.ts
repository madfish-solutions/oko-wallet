import { Linking } from 'react-native';

import { okoLinks } from '../constants';

export const goToWebsite = () => Linking.openURL(okoLinks.website);
export const goToRepository = () => Linking.openURL(okoLinks.repository);
export const goToPrivatePolicy = () => Linking.openURL(okoLinks.privatePolicy);
export const goToTermsOfUse = () => Linking.openURL(okoLinks.termsOfUse);
export const goToCareers = () => Linking.openURL(okoLinks.careers);
export const goToContact = () => Linking.openURL(okoLinks.contact);
