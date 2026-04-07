# @kevtucker/react-native-better-toast

[![npm version](https://img.shields.io/npm/v/@kevtucker/react-native-better-toast.svg?style=flat)](https://www.npmjs.com/package/@kevtucker/react-native-better-toast)
[![npm downloads](https://img.shields.io/npm/dm/@kevtucker/react-native-better-toast.svg?style=flat)](https://www.npmjs.com/package/@kevtucker/react-native-better-toast)
[![GitHub license](https://img.shields.io/github/license/Tucker2015/react-native-better-toast.svg)](https://github.com/Tucker2015/react-native-better-toast/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Tucker2015/react-native-better-toast.svg)](https://github.com/Tucker2015/react-native-better-toast/issues)

A lightweight global toast component for React Native and Expo with variants, optional icons, and optional enter/exit animations.

## Installation

```sh
yarn add @kevtucker/react-native-better-toast
```

If your app does not already include Expo vector icons, install them too:

```sh
yarn add @expo/vector-icons
```

## Quick Start

Mount one toast host near the root of your app:

```tsx
import { Toast } from '@kevtucker/react-native-better-toast';

export default function App() {
	return (
		<>
			{/* Your app UI */}
			<Toast position="top" />
		</>
	);
}
```

Trigger toasts from anywhere:

```tsx
import { Button } from 'react-native';
import { Toast } from '@kevtucker/react-native-better-toast';

export function SaveButton() {
	return (
		<Button
			title="Show Toast"
			onPress={() => {
				Toast.success('You have successfully shown a toast!');
			}}
		/>
	);
}
```

## API

### Toast Host Props

Pass these props to the mounted host component:

- `duration?: number` default duration for all toasts (default: `2500`)
- `position?: 'top' | 'bottom'` default position for all toasts (default: `'top'`)
- `icon?: IoniconsName | null | false` global icon default; set `false` to disable icons globally
- `textColor?: string` global text color default
- `animated?: boolean` enable enter/exit animations (default: `true`); set `false` to disable — recommended if you encounter animation issues on Expo SDK 55+

### Global Methods

- `Toast.show(message, options?)`
- `Toast.show(optionsObject)`
- `Toast.success(message, options?)`
- `Toast.error(message, options?)`
- `Toast.info(message, options?)`
- `Toast.warning(message, options?)`
- `Toast.hide()`

### Show Options

- `message: string`
- `variant?: 'default' | 'success' | 'error' | 'info' | 'warning'`
- `duration?: number`
- `position?: 'top' | 'bottom'`
- `color?: string` custom toast background color
- `textColor?: string` custom toast text color
- `icon?: IoniconsName | null | false` override icon, set `null` or `false` to hide it
- `iconColor?: string`
- `iconSize?: number`

## TypeScript

The package exports helpful types you can use in your app:

- `ToastProps`
- `ToastShowOptions`
- `ToastVariant`
- `ToastPosition`
- `ToastIconName`

Example typed helper:

```tsx
import {
	Toast,
	type ToastShowOptions,
	type ToastVariant,
} from '@kevtucker/react-native-better-toast';

const showTypedToast = (variant: ToastVariant, message: string) => {
	const options: ToastShowOptions = {
		message,
		variant,
		duration: 2500,
		position: 'top',
	};

	Toast.show(options);
};

showTypedToast('success', 'Profile updated');
```

## Examples

```tsx
Toast.success('Saved successfully');

Toast.error('Upload failed', {
	duration: 4000,
	position: 'bottom',
});

Toast.show('Custom style', {
	color: '#111827',
	textColor: '#f9fafb',
	icon: 'sparkles',
	iconColor: '#fbbf24',
	iconSize: 20,
});

Toast.show({
	message: 'No icon toast',
	variant: 'info',
	icon: null,
});
```

Disable all icons globally:

```tsx
<Toast position="top" icon={false} />
```

Disable animations (recommended for Expo SDK 55+):

```tsx
<Toast position="top" animated={false} />
```

## Local Development (Without Publishing)

Use `yalc` to test this package in another app before publishing to npm.

In this library:

```sh
yarn yalc:publish
```

In your other app:

```sh
yalc add @kevtucker/react-native-better-toast
yarn install
```

After library changes:

```sh
yarn yalc:push
```

If Metro serves stale code:

```sh
expo start -c
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT
