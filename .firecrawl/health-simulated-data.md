[Skip to main content](https://developer.android.com/health-and-fitness/health-services/simulated-data#main-content)

[![Android Developers](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/android/images/lockup.png)](https://developer.android.com/)

`/`

Language

- [English](https://developer.android.com/health-and-fitness/health-services/simulated-data)
- [Deutsch](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=de)
- [Español – América Latina](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=es-419)
- [Français](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=fr)
- [Indonesia](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=id)
- [Italiano](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=it)
- [Polski](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=pl)
- [Português – Brasil](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=pt-br)
- [Tiếng Việt](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=vi)
- [Türkçe](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=tr)
- [Русский](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=ru)
- [עברית](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=he)
- [العربيّة](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=ar)
- [فارسی](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=fa)
- [हिंदी](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=hi)
- [বাংলা](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=bn)
- [ภาษาไทย](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=th)
- [中文 – 简体](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=zh-cn)
- [中文 – 繁體](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=zh-tw)
- [日本語](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=ja)
- [한국어](https://developer.android.com/health-and-fitness/health-services/simulated-data?hl=ko)

[Android Studio](https://developer.android.com/studio)

[Sign in](https://developer.android.com/_d/signin?continue=https%3A%2F%2Fdeveloper.android.com%2Fhealth-and-fitness%2Fhealth-services%2Fsimulated-data&prompt=select_account)

- [Health & fitness dev center](https://developer.android.com/health-and-fitness)

- On this page
- [Use synthetic data on Wear OS 4 and higher](https://developer.android.com/health-and-fitness/health-services/simulated-data#use-synthetic-data-on-wear-os-4)
  - [Use the Health Services Sensor Panel](https://developer.android.com/health-and-fitness/health-services/simulated-data#use-health-services-sensor-panel)
  - [Generate synthetic data with the emulator](https://developer.android.com/health-and-fitness/health-services/simulated-data#generate-synthetic-data)
- [Use synthetic data on Wear OS 3](https://developer.android.com/health-and-fitness/health-services/simulated-data#use-synthetic-data-on-wear-os-3)
  - [Enable synthetic data generation](https://developer.android.com/health-and-fitness/health-services/simulated-data#enable)
  - [Disable synthetic data generation](https://developer.android.com/health-and-fitness/health-services/simulated-data#sensor)
  - [Synthetic exercises](https://developer.android.com/health-and-fitness/health-services/simulated-data#dependencies)
  - [Other states and events](https://developer.android.com/health-and-fitness/health-services/simulated-data#other)

Google Fit APIs will be supported until the end of 2026. To learn about the recommended migration paths, see [Migration guide](https://developer.android.com/health-and-fitness/health-connect/migration/fit).


- [Android Developers](https://developer.android.com/)
- [Essentials](https://developer.android.com/get-started)
- [Health & fitness dev center](https://developer.android.com/health-and-fitness)
- [Fitness Guides](https://developer.android.com/health-and-fitness/fitness)

Was this helpful?

# Simulate sensor data with Health Services    Stay organized with collections      Save and categorize content based on your preferences.

- On this page
- [Use synthetic data on Wear OS 4 and higher](https://developer.android.com/health-and-fitness/health-services/simulated-data#use-synthetic-data-on-wear-os-4)
  - [Use the Health Services Sensor Panel](https://developer.android.com/health-and-fitness/health-services/simulated-data#use-health-services-sensor-panel)
  - [Generate synthetic data with the emulator](https://developer.android.com/health-and-fitness/health-services/simulated-data#generate-synthetic-data)
- [Use synthetic data on Wear OS 3](https://developer.android.com/health-and-fitness/health-services/simulated-data#use-synthetic-data-on-wear-os-3)
  - [Enable synthetic data generation](https://developer.android.com/health-and-fitness/health-services/simulated-data#enable)
  - [Disable synthetic data generation](https://developer.android.com/health-and-fitness/health-services/simulated-data#sensor)
  - [Synthetic exercises](https://developer.android.com/health-and-fitness/health-services/simulated-data#dependencies)
  - [Other states and events](https://developer.android.com/health-and-fitness/health-services/simulated-data#other)

Use synthetic data generated from Health Services on Wear OS to test your app as
though an exercise were really happening.

If you're testing on an emulator running Wear OS 3 (API level 30) or higher,
you can use synthetic data generated by the emulator. Consult the following
guide to learn more about differences between synthetic data generation for
Wear OS 3 and higher.

## Use synthetic data on Wear OS 4 and higher

If you're testing on an emulator running Wear OS 4 (API level 33) or higher, you
can use synthetic data generated by the emulator to test your app. This
introduces a number of improvements over how synthetic data is generated on
earlier versions of Wear OS:

- Synthetic data generation on Wear OS 4 and higher is integrated with the
Health Services API lifecycle. This means that there is no need for adb
commands to start or stop the exercise. Instead, you can start or stop the
exercise in-app as a user would.

- Expanded support for exercise events: You can simulate receiving [auto pause\\
and resume events](https://developer.android.com/reference/kotlin/androidx/health/services/client/data/ExerciseState#AUTO_PAUSED()),
[fall events](https://developer.android.com/reference/kotlin/androidx/health/services/client/data/HealthEvent.Type#FALL_DETECTED()),
[sleep detection](https://developer.android.com/reference/kotlin/androidx/health/services/client/data/UserActivityState#USER_ACTIVITY_ASLEEP()),
and [golf shot detection](https://developer.android.com/reference/kotlin/androidx/health/services/client/data/GolfShotEvent).


### Use the Health Services Sensor Panel

[Android Studio Koala Feature Drop (Canary)](https://developer.android.com/studio/preview) includes a
Health Services on Wear OS sensor panel. The panel can be used to simulate a
device having or not having specific sensor capabilities, which is important
to test when building fitness apps on Wear OS.

You can also use the panel to change the values of metrics and observe how your
app adjusts.

To open and use the panel, do the following:

1. Create or open an [Android Virtual Device (AVD)](https://developer.android.com/studio/run/managing-avds)
and [run your app on the emulator](https://developer.android.com/studio/run/emulator#avd).
2. In the emulator panel, select **Wear Health Services**.
![Open Wear Health Services panel](https://developer.android.com/static/images/tools/e-health-services.png) The **Wear Health Services** panel
opens, showing a list of sensors that are available on different
Android-powered devices.

After the panel opens, you can do the following:

- Toggle between **Standard capabilities**, and
**All capabilities** (default) to choose the set of capabilities that are
enabled during the next exercise. You can enable or disable
individual capabilities by selecting the checkboxes. Select **Apply** to
send the current list of capabilities to the emulated device, and select
**Reset** to restore the list of capabilities to their default on-off values.
- Trigger different user events after you select the **Trigger events**
drop-down button. From here, you can **Trigger auto pause/resume** of fitness
activities, **Trigger sleep events** by the user, and **Trigger golf shots**
that the user takes on a golf course or mini-golf course.
- Override sensor values after you begin an exercise in an app that's installed
on the emulator. After you enter new values for different exercise metrics,
select **Apply** to sync these values with the emulator. This is useful for
testing how your app handles different exercise conditions and users' fitness
tendencies.

### Generate synthetic data with the emulator

You can also run your app without the sensor panel and have data be
automatically generated by the emulator.

Use your in-app controls to start, pause, and end synthetic data generation.

Also note that the emulator generates the same data values for each exercise.

#### Simulate events

You can simulate various events in the emulator such as `AUTO_PAUSE_DETECTED`.
The following command can be used to trigger those events:

```
adb shell am broadcast -a "whs.event-key" com.google.android.wearable.healthservices
```

#### Synthetic events

| Event | Key |
| --- | --- |
| Auto-Pause Detected | `whs.AUTO_PAUSE_DETECTED` |
| Auto-Resume Detected | `whs.AUTO_RESUME_DETECTED` |
| Fall Detected | `whs.FALL_OVER` |
| Sleep Detected | `whs.START_SLEEPING` |
| Sleep-Stop Detected | `whs.STOP_SLEEPING` |
| Golf Shot Detected | `whs.GOLF_SHOT` |

For example, you can use the following command to trigger an auto pause event:

```
adb shell am broadcast -a "whs.AUTO_PAUSE_DETECTED" com.google.android.wearable.healthservices
```

For golf shot events, you should specify additional parameters for
[golf shot swing type](https://developer.android.com/reference/kotlin/androidx/health/services/client/data/GolfShotEvent.GolfShotSwingType), which are outlined in the
following table:

| Golf Shot Swing Type | Parameter |
| --- | --- |
| Swing Putt Type | putt |
| Swing Partial Type | partial |
| Swing Full Type | full |

_Table 1: Events and their keys_

Add the golf shot swing type after specifying the golf shot event:

```
adb shell am broadcast -a "whs.GOLF_SHOT" --es golf_shot_swing_type \
  "golf-swing-type-parameter" com.google.android.wearable.healthservices
```

For example, the following command triggers a partial golf shot:

```
adb shell am broadcast -a "whs.GOLF_SHOT" --es golf_shot_swing_type "partial" \
  com.google.android.wearable.healthservices
```

## Use synthetic data on Wear OS 3

If you're testing on an emulator running Wear OS 3, you can also use synthetic
data to test your app.

### Enable synthetic data generation

Complete the following steps to enable synthetic data generation on Wear OS 3.

1. Enable [developer options](https://developer.android.com/training/wearables/get-started/debugging#enable-dev-options).
2. Issue the following `adb` command to enable synthetic mode:








```
adb shell am broadcast \
   -a "whs.USE_SYNTHETIC_PROVIDERS" \
com.google.android.wearable.healthservices
```


Once synthetic data generation is enabled, issue commands described on this
page to control the behavior of the "synthetic user."

### Disable synthetic data generation

To switch back to using real sensors, run the following command:

```
adb shell am broadcast \
-a "whs.USE_SENSOR_PROVIDERS" \
com.google.android.wearable.healthservices
```

### Synthetic exercises

Health Services supports the following exercise types:

- **Walking:**`whs.synthetic.user.START_WALKING`
- **Running:**`whs.synthetic.user.START_RUNNING`
- **Hiking:**`whs.synthetic.user.START_HIKING`
- **Swimming:**`whs.synthetic.user.START_SWIMMING`
- **Running on a treadmill:**`whs.synthetic.user.START_RUNNING_TREADMILL`

The exercises generate realistic synthetic data for the following data types:

- Heart rate
- Step count per minute
- GPS location, using a single default route
- Duration of the activity
- Elevation and floors

In addition, the following states can be generated:

- Sleep state—asleep or awake
- Fall detection

#### Start

To start simulating an exercise, issue the appropriate broadcast to
`com.google.android.wearable.healthservices`:

```
# start the "walking" synthetic exercise
$ adb shell am broadcast \
-a "whs.synthetic.user.START_WALKING" \
com.google.android.wearable.healthservices
```

Each activity has presets for the supported metrics:

| Activity | Heart rate | Average speed | Elevation change | Use location |
| --- | --- | --- | --- | --- |
| Walking | 120 bpm | 1.4 m/sec | 20.0 m/min | true |
| Running | 170 bpm | 2.3 m/sec | 20.0 m/min | true |
| Hiking | 150 bpm | 1.3 m/sec | 20.0 m/min | true |
| Swimming | 150 bpm | 1.6 m/sec | 0.0 m/min | true |
| Running on treadmill | 160 bpm | 2.3 m/sec | 20.0 m/min | false |

#### Stop

To stop the synthetic activity, use the following command:

```
adb shell am broadcast \
-a "whs.synthetic.user.STOP_EXERCISE" \
com.google.android.wearable.healthservices
```

#### Custom

For more precise control over what metrics are generated, start a custom
exercise activity using the action string `whs.synthetic.user.START_EXERCISE`.
Provide any combination of the following flags:

- `--ei exercise_options_duration_secs <int>`:
duration of the exercise in seconds. Default: `0`.
- `--ei exercise_options_heart_rate <int>`:
heart rate in beats per minute. Average: `70`.
- `--ef exercise_options_average_speed <float>`:
average speed in meters per second. Also affects steps per minute, or
_cadence_. Default: `0`.
- `--ez exercise_options_use_location <boolean>`:
whether to emit location data during the exercise, using a default route.
Default: `false`.
- `--ef exercise_options_max_elevation_rate <float>`:
maximum possible elevation change rate in meters per minute. Default: `0`.

For example, set exercise options in the following way:

```
adb shell am broadcast \
-a "whs.synthetic.user.START_EXERCISE" \
--ei exercise_options_heart_rate 90 \
--ef exercise_options_average_speed 1.2 \
--ez exercise_options_use_location true \
com.google.android.wearable.healthservices
```

You can also change the data types that are available, whether or
not the real or emulated hardware supports a particular data type.
For example, you can enable or disable absolute elevation,
as shown in the following snippet:

```
# enable synthetic mode and enable absolute elevation
$ adb shell am broadcast \
-a "whs.CONFIGURE_SYNTHETIC_DEVICE" \
--ez absolute_elevation true \
com.google.android.wearable.healthservices

# enable synthetic mode and disable absolute elevation
$ adb shell am broadcast \
-a "whs.CONFIGURE_SYNTHETIC_DEVICE" \
--ez absolute_elevation false \
com.google.android.wearable.healthservices
```

### Other states and events

This section describes how to simulate other states and events, such as sleep
and falls.

#### Sleep state

You can also trigger sleep states for the synthetic user. Two states are
supported: asleep and awake.

To enter the asleep state, run this command:

```
adb shell am broadcast \
-a "whs.synthetic.user.START_SLEEPING" \
com.google.android.wearable.healthservices
```

To enter the awake state, run this command:

```
adb shell am broadcast \
-a "whs.synthetic.user.STOP_SLEEPING" \
com.google.android.wearable.healthservices
```

#### Fall detection

To simulate a fall, run this command:

```
adb shell am broadcast \
-a "whs.synthetic.user.FALL_OVER" \
com.google.android.wearable.healthservices
```

It can take up to a minute for health services to deliver the fall event.

Was this helpful?

Content and code samples on this page are subject to the licenses described in the [Content License](https://developer.android.com/license). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-01-19 UTC.




\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-01-19 UTC."\],\[\],\[\]\]