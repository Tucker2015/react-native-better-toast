import { useEffect, useRef, useState } from 'react';
import { Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type {
  ToastIcon,
  ToastIconName,
  ToastProps,
  ToastShowOptions,
  ToastVariant,
} from './toast.types';
import { styles, variantBackgrounds } from './toastStyles';

const variantIcons: Record<ToastVariant, ToastIconName | null> = {
  default: null,
  success: 'checkmark-circle',
  error: 'close-circle',
  info: 'information-circle',
  warning: 'warning',
};

type ToastState = Required<
  Pick<ToastShowOptions, 'duration' | 'position' | 'variant'>
> &
  Omit<ToastShowOptions, 'duration' | 'position' | 'variant'> & {
    id: number;
    visible: boolean;
  };

type ToastDefaults = Pick<Required<ToastProps>, 'duration' | 'position'> & {
  icon?: ToastIcon;
  textColor?: string;
};

type ToastMethodOptions = Omit<ToastShowOptions, 'message' | 'variant'>;

type ToastComponent = ((props: ToastProps) => React.JSX.Element | null) & {
  show: (
    messageOrOptions: string | ToastShowOptions,
    options?: Omit<ToastShowOptions, 'message'>
  ) => void;
  success: (message: string, options?: ToastMethodOptions) => void;
  error: (message: string, options?: ToastMethodOptions) => void;
  info: (message: string, options?: ToastMethodOptions) => void;
  warning: (message: string, options?: ToastMethodOptions) => void;
  hide: () => void;
};

type ToastSubscriber =
  | { type: 'hide' }
  | { type: 'show'; payload: ToastShowOptions };

const subscribers = new Set<(event: ToastSubscriber) => void>();

const emit = (event: ToastSubscriber) => {
  subscribers.forEach((subscriber) => {
    subscriber(event);
  });
};

const show = (
  messageOrOptions: string | ToastShowOptions,
  options?: Omit<ToastShowOptions, 'message'>
) => {
  if (typeof messageOrOptions === 'string') {
    emit({
      type: 'show',
      payload: {
        message: messageOrOptions,
        ...options,
      },
    });

    return;
  }

  emit({ type: 'show', payload: messageOrOptions });
};

const showVariant = (variant: ToastVariant) => {
  return (message: string, options?: ToastMethodOptions) => {
    show({
      message,
      variant,
      ...options,
    });
  };
};

const buildToastState = (
  payload: ToastShowOptions,
  id: number,
  defaults: ToastDefaults
): ToastState => ({
  id,
  visible: true,
  message: payload.message,
  color: payload.color,
  textColor:
    payload.textColor === undefined ? defaults.textColor : payload.textColor,
  icon: payload.icon === undefined ? defaults.icon : payload.icon,
  iconColor: payload.iconColor,
  iconSize: payload.iconSize,
  variant: payload.variant ?? 'default',
  duration: payload.duration ?? defaults.duration,
  position: payload.position ?? defaults.position,
});

const ToastHost = ({
  duration = 2500,
  position = 'top',
  icon,
  textColor,
  animated = true,
}: ToastProps) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const toastRef = useRef<ToastState | null>(null);
  const nextIdRef = useRef(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(
    new Animated.Value(position === 'top' ? -12 : 12)
  ).current;

  useEffect(() => {
    toastRef.current = toast;
  }, [toast]);

  useEffect(() => {
    const defaults = { duration, position, icon, textColor };

    const handleEvent = (event: ToastSubscriber) => {
      if (event.type === 'hide') {
        setToast((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            visible: false,
          };
        });

        return;
      }

      nextIdRef.current += 1;
      const nextToast = buildToastState(
        event.payload,
        nextIdRef.current,
        defaults
      );

      if (toastRef.current?.visible) {
        setToast({
          ...nextToast,
          visible: false,
        });

        requestAnimationFrame(() => {
          setToast((current) => {
            if (current && current.id !== nextToast.id) {
              return current;
            }

            return nextToast;
          });
        });

        return;
      }

      setToast(nextToast);
    };

    subscribers.add(handleEvent);

    return () => {
      subscribers.delete(handleEvent);
    };
  }, [duration, position, icon, textColor]);

  useEffect(() => {
    if (!toast?.visible || toast.duration <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setToast((current) => {
        if (!current || current.id !== toast.id) {
          return current;
        }

        return {
          ...current,
          visible: false,
        };
      });
    }, toast.duration);

    return () => clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const hiddenOffset = toast.position === 'top' ? -12 : 12;

    if (toast.visible) {
      setIsRendered(true);

      if (!animated) {
        opacity.setValue(1);
        translateY.setValue(0);
        return;
      }

      opacity.setValue(0);
      translateY.setValue(hiddenOffset);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();

      return;
    }

    if (!animated) {
      setIsRendered(false);
      setToast(null);
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: hiddenOffset,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsRendered(false);
        setToast((current) => {
          if (!current || current.visible) {
            return current;
          }

          return null;
        });
      }
    });
  }, [animated, opacity, toast, translateY]);

  if (!toast || !isRendered) {
    return null;
  }

  const resolvedIcon: ToastIcon =
    toast.icon === undefined ? variantIcons[toast.variant] : toast.icon;
  const iconName = resolvedIcon === false ? null : resolvedIcon;

  return (
    <Animated.View
      style={[
        styles.container,
        toast.position === 'top' ? styles.top : styles.bottom,
        {
          backgroundColor: toast.color ?? variantBackgrounds[toast.variant],
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Animated.View style={styles.content}>
        {iconName ? (
          <Ionicons
            style={styles.icon}
            name={iconName}
            size={toast.iconSize ?? 18}
            color={toast.iconColor ?? '#fff'}
          />
        ) : null}
        <Text
          style={[
            styles.message,
            toast.textColor ? { color: toast.textColor } : null,
          ]}
        >
          {toast.message}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const Toast = Object.assign(ToastHost, {
  show,
  success: showVariant('success'),
  error: showVariant('error'),
  info: showVariant('info'),
  warning: showVariant('warning'),
  hide: () => emit({ type: 'hide' }),
}) as ToastComponent;

export default Toast;
