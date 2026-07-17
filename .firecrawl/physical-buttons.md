[Skip to main content](https://developer.android.com/training/wearables/user-input/physical-buttons#main-content)

[![Android Developers](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/android/images/lockup.png)](https://developer.android.com/)

`/`

Language

- [English](https://developer.android.com/training/wearables/user-input/physical-buttons)
- [Deutsch](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=de)
- [Español – América Latina](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=es-419)
- [Français](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=fr)
- [Indonesia](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=id)
- [Italiano](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=it)
- [Polski](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=pl)
- [Português – Brasil](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=pt-br)
- [Tiếng Việt](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=vi)
- [Türkçe](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=tr)
- [Русский](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=ru)
- [עברית](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=he)
- [العربيّة](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=ar)
- [فارسی](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=fa)
- [हिंदी](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=hi)
- [বাংলা](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=bn)
- [ภาษาไทย](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=th)
- [中文 – 简体](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=zh-cn)
- [中文 – 繁體](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=zh-tw)
- [日本語](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=ja)
- [한국어](https://developer.android.com/training/wearables/user-input/physical-buttons?hl=ko)

[Android Studio](https://developer.android.com/studio)

[Sign in](https://developer.android.com/_d/signin?continue=https%3A%2F%2Fdeveloper.android.com%2Ftraining%2Fwearables%2Fuser-input%2Fphysical-buttons&prompt=select_account)

- [Develop](https://developer.android.com/develop)
- [Devices](https://developer.android.com/develop/devices)
- [Wear OS](https://developer.android.com/training/wearables)

- On this page
- [Button metadata](https://developer.android.com/training/wearables/user-input/physical-buttons#metadata)
  - [Number of buttons](https://developer.android.com/training/wearables/user-input/physical-buttons#number-of-buttons)
  - [Keycodes for button presses](https://developer.android.com/training/wearables/user-input/physical-buttons#keycodes-for-button-presses)
- [Handle button presses](https://developer.android.com/training/wearables/user-input/physical-buttons#button-presses)
- [Determine the button positions](https://developer.android.com/training/wearables/user-input/physical-buttons#determine-button-position)

- [Android Developers](https://developer.android.com/)
- [Develop](https://developer.android.com/develop)
- [Devices](https://developer.android.com/develop/devices)
- [Wear OS](https://developer.android.com/training/wearables)

Was this helpful?

# Physical buttons    Stay organized with collections      Save and categorize content based on your preferences.

- On this page
- [Button metadata](https://developer.android.com/training/wearables/user-input/physical-buttons#metadata)
  - [Number of buttons](https://developer.android.com/training/wearables/user-input/physical-buttons#number-of-buttons)
  - [Keycodes for button presses](https://developer.android.com/training/wearables/user-input/physical-buttons#keycodes-for-button-presses)
- [Handle button presses](https://developer.android.com/training/wearables/user-input/physical-buttons#button-presses)
- [Determine the button positions](https://developer.android.com/training/wearables/user-input/physical-buttons#determine-button-position)

A wearable device typically contains multiple physical buttons, also known as
_stems_. Wear OS devices always have, at minimum, one button: the power button.
Beyond that, zero or more multifunction buttons might be present.
Some devices also provide a [physical rotating side button](https://developer.android.com/training/wearables/compose/rotary-input).

In your app, you can assign multifunction buttons to actions for when your app
is in foreground. For example, a fitness app might start or pause a workout
using multifunction buttons:

![A watch with multiple side buttons. The system designates one of the buttons as the multi-function button.](https://developer.android.com/static/wear/images/multi_function_buttons.png)Figure 1. Wear OS fitness app showing multifunction buttons.

For suitable use cases and design considerations, see the
[Wear OS design principles](https://developer.android.com/training/wearables/design).

This document describes how to retrieve information about available
multifunction
buttons on a device and how to process button presses.

## Button metadata

To get extra information about the buttons on a device, use the API defined in
the [Wear Input](https://developer.android.com/reference/androidx/wear/input/package-summary) AndroidX
library. Add the following dependency in your app module's `build.gradle` file:

```
dependencies {
implementation "androidx.wear:wear-input:1.2.0"
}
```

### Number of buttons

Determine how many buttons are available on the device, use the
[`WearableButtons.getButtonCount()`](https://developer.android.com/reference/androidx/wear/input/WearableButtons#getButtonCount(android.content.Context))
method. This method includes the power button, so if the method returns a value
greater than one, then there are multifunction buttons available for use. To get
an accurate count of assignable multifunction buttons, subtract one from the
count, since the first button is always the power button.

### Keycodes for button presses

Each button is mapped to an `int` constant from the
[`KeyEvent`](https://developer.android.com/reference/android/view/KeyEvent)
class, as shown in the following table:

| Button | KeyEvent |
| --- | --- |
| Multifunction button 1 | `KEYCODE_STEM_1` |
| Multifunction button 2 | `KEYCODE_STEM_2` |
| Multifunction button 3 | `KEYCODE_STEM_3` |

The following example code shows how to get the available button count:

```
val count = WearableButtons.getButtonCount(context)

if (count > 1) {
    Log.d(TAG, "More than one button available")
}

val buttonInfo = WearableButtons.getButtonInfo(
    activity,
    KeyEvent.KEYCODE_STEM_1
)

if (buttonInfo == null) {
    // KEYCODE_STEM_1 is unavailable
    Log.d(TAG, "KEYCODE_STEM_1 not available")
} else {
    // KEYCODE_STEM_1 is present on the device
    Log.d(TAG, "KEYCODE_STEM_1 is present on the device")
}HardwareButtonsActivity.kt
```

## Handle button presses

There are a number of possible button keycodes that your app can handle:

- `KEYCODE_STEM_1`.
- `KEYCODE_STEM_2`.

Your app can receive these key codes and convert them to specific in-app
actions.

To handle a button press, implement the
[`onKeyDown()`](https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent))
method.

For example, this implementation responds to button presses to control actions
in an app:

```
override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    return if (event?.repeatCount == 0) {
        when (keyCode) {
            KeyEvent.KEYCODE_STEM_1 -> {
                Log.d(TAG, "KEYCODE_STEM_1 pressed")
                true
            }
            KeyEvent.KEYCODE_STEM_2 -> {
                Log.d(TAG, "KEYCODE_STEM_2 pressed")
                true
            }
            else -> {
                super.onKeyDown(keyCode, event)
            }
        }
    } else {
        super.onKeyDown(keyCode, event)
    }
}HardwareButtonsActivity.kt
```

## Determine the button positions

The AndroidX Library provides two methods that describe the location of a
button:

- [`WearableButtons.getButtonLabel()`](https://developer.android.com/reference/androidx/wear/input/WearableButtons#getButtonLabel(android.content.Context,int))
returns a localized string describing the general placement of the button on
the device.
- [`WearableButtons.getButtonIcon()`](https://developer.android.com/reference/androidx/wear/input/WearableButtons#getButtonIcon(android.content.Context,int))
returns an icon representing the general placement of the button on the
device.

If these APIs don't suit your app's needs, you can also use the
`WearableButtons.getButtonInfo()` API to get the location of the button on the
screen and handle it in a more customized way. For more information on the APIs,
see the [Wear API reference](https://developer.android.com/reference/kotlin/androidx/wear/input/package-summary).

Was this helpful?

Content and code samples on this page are subject to the licenses described in the [Content License](https://developer.android.com/license). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-06-16 UTC.




\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-06-16 UTC."\],\[\],\[\]\]