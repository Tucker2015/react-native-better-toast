import { StyleSheet } from 'react-native';
import type { ToastVariant } from './toast.types';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#1f2937',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  top: {
    top: 56,
  },
  bottom: {
    bottom: 40,
  },
  message: {
    flexShrink: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export const variantBackgrounds: Record<ToastVariant, string> = {
  default: '#1f2937',
  success: '#15803d',
  error: '#b91c1c',
  info: '#1d4ed8',
  warning: '#b45309',
};
