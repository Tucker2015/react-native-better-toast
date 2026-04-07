import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type ToastVariant = 'default' | 'success' | 'error' | 'info' | 'warning';

export type ToastPosition = 'top' | 'bottom';

export type ToastIconName = ComponentProps<typeof Ionicons>['name'];
export type ToastIcon = ToastIconName | null | false;

export type ToastShowOptions = {
  message: string;
  color?: string;
  textColor?: string;
  variant?: ToastVariant;
  icon?: ToastIcon;
  iconColor?: string;
  iconSize?: number;
  duration?: number;
  position?: ToastPosition;
};

export type ToastProps = {
  duration?: number;
  position?: ToastPosition;
  icon?: ToastIcon;
  textColor?: string;
  animated?: boolean;
};
