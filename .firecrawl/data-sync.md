[Skip to main content](https://developer.android.com/training/wearables/data/sync#main-content)

[![Android Developers](https://www.gstatic.com/devrel-devsite/prod/v7669de8735de7fa899c49c793af6b01f3bfef3435bb66621d079ef252c528b54/android/images/lockup.png)](https://developer.android.com/)

`/`

Language

- [English](https://developer.android.com/training/wearables/data/sync)
- [Deutsch](https://developer.android.com/training/wearables/data/sync?hl=de)
- [Español – América Latina](https://developer.android.com/training/wearables/data/sync?hl=es-419)
- [Français](https://developer.android.com/training/wearables/data/sync?hl=fr)
- [Indonesia](https://developer.android.com/training/wearables/data/sync?hl=id)
- [Italiano](https://developer.android.com/training/wearables/data/sync?hl=it)
- [Polski](https://developer.android.com/training/wearables/data/sync?hl=pl)
- [Português – Brasil](https://developer.android.com/training/wearables/data/sync?hl=pt-br)
- [Tiếng Việt](https://developer.android.com/training/wearables/data/sync?hl=vi)
- [Türkçe](https://developer.android.com/training/wearables/data/sync?hl=tr)
- [Русский](https://developer.android.com/training/wearables/data/sync?hl=ru)
- [עברית](https://developer.android.com/training/wearables/data/sync?hl=he)
- [العربيّة](https://developer.android.com/training/wearables/data/sync?hl=ar)
- [فارسی](https://developer.android.com/training/wearables/data/sync?hl=fa)
- [हिंदी](https://developer.android.com/training/wearables/data/sync?hl=hi)
- [বাংলা](https://developer.android.com/training/wearables/data/sync?hl=bn)
- [ภาษาไทย](https://developer.android.com/training/wearables/data/sync?hl=th)
- [中文 – 简体](https://developer.android.com/training/wearables/data/sync?hl=zh-cn)
- [中文 – 繁體](https://developer.android.com/training/wearables/data/sync?hl=zh-tw)
- [日本語](https://developer.android.com/training/wearables/data/sync?hl=ja)
- [한국어](https://developer.android.com/training/wearables/data/sync?hl=ko)

[Android Studio](https://developer.android.com/studio)

[Sign in](https://developer.android.com/_d/signin?continue=https%3A%2F%2Fdeveloper.android.com%2Ftraining%2Fwearables%2Fdata%2Fsync&prompt=select_account)

- [Develop](https://developer.android.com/develop)
- [Devices](https://developer.android.com/develop/devices)
- [Wear OS](https://developer.android.com/training/wearables)

- On this page
- [Send and sync data directly from the network](https://developer.android.com/training/wearables/data/sync#send-and-sync-network)
- [Synchronize data using the Wear OS Data Layer API](https://developer.android.com/training/wearables/data/sync#sync-data)
  - [Listen for events in services](https://developer.android.com/training/wearables/data/sync#listen-events-services)
  - [Listen for events in activities](https://developer.android.com/training/wearables/data/sync#listen-events-activities)
- [Synchronize data](https://developer.android.com/training/wearables/data/sync#sync-data)
  - [Transfer an asset](https://developer.android.com/training/wearables/data/sync#TransferAsset)
  - [Receive assets](https://developer.android.com/training/wearables/data/sync#ReceiveAsset)

- [Android Developers](https://developer.android.com/)
- [Develop](https://developer.android.com/develop)
- [Devices](https://developer.android.com/develop/devices)
- [Wear OS](https://developer.android.com/training/wearables)

Was this helpful?

# Sync data    Stay organized with collections      Save and categorize content based on your preferences.

- On this page
- [Send and sync data directly from the network](https://developer.android.com/training/wearables/data/sync#send-and-sync-network)
- [Synchronize data using the Wear OS Data Layer API](https://developer.android.com/training/wearables/data/sync#sync-data)
  - [Listen for events in services](https://developer.android.com/training/wearables/data/sync#listen-events-services)
  - [Listen for events in activities](https://developer.android.com/training/wearables/data/sync#listen-events-activities)
- [Synchronize data](https://developer.android.com/training/wearables/data/sync#sync-data)
  - [Transfer an asset](https://developer.android.com/training/wearables/data/sync#TransferAsset)
  - [Receive assets](https://developer.android.com/training/wearables/data/sync#ReceiveAsset)

This document describes how to synchronize data between a Wear OS device and a
phone. See the [overview guidance](https://developer.android.com/training/wearables/data/overview) for when to use the Data Layer
API and when to use your infrastructure.

## Send and sync data directly from the network

Build Wear OS apps to [communicate directly with the network](https://developer.android.com/training/wearables/data-layer/network-access). Use the same
APIs that you use for mobile development, but keep some Wear-OS-specific
differences in mind.

## Synchronize data using the Wear OS Data Layer API

A `DataClient` exposes an API for components to read or write to a `DataItem` or
`Asset`.

It's possible to set data items and assets while not connected to any devices.
They're synchronized when the devices establish a network connection. This data
is private to your app and is only accessible to your app on other devices.

- A `DataItem` is synchronized across all devices in a Wear OS network.
They're generally small in size.

- Use an `Asset` to transfer a larger object, such as an image. The system
keeps track of which assets have already been transferred and performs
deduplication automatically.


### Listen for events in services

Extend the [`WearableListenerService`](https://developers.google.com/android/reference/com/google/android/gms/wearable/WearableListenerService) class. The system manages the
lifecycle of the base `WearableListenerService`, binding to the service when it
needs to send data items or messages and unbinding the service when no work is
needed.

### Listen for events in activities

Implement the [`OnDataChangedListener`](https://developers.google.com/android/reference/com/google/android/gms/wearable/DataClient.OnDataChangedListener) interface. Use this interface instead
of a `WearableListenerService` when you want to listen for changes only when the
user is actively using your app.

description: Transfer large binary objects, such as images, between Android phones and Wear OS watches using Assets in the Data Layer API.
keywords\_public: Wear OS, Data Layer API, Assets, Bluetooth data transfer, data synchronization, DataMap, PutDataRequest

## Synchronize data

To share large binary objects over the Bluetooth transport, such as a voice
recording from another device, you can attach an [`Asset`](https://developers.google.com/android/reference/com/google/android/gms/wearable/Asset) to a data
item and then put the data item into the replicated datastore.

**Note:** The Data Layer API can send messages and synchronize data only with
phones that run Android or Wear OS watches. If a Wear OS device is paired with
an iOS device, the Data Layer API won't work.

For this reason, don't use the Data Layer API as the primary way to communicate
with a network. Instead, follow the same pattern in your Wear OS app as in a
phone app—with some minor differences, as described in [Network access and sync\\
on Wear OS](https://developer.android.com/training/wearables/data-layer/network-access).

Assets automatically handle caching of data to prevent retransmission and to
conserve Bluetooth bandwidth. A common pattern is for a phone app to download an
image, shrink it to an appropriate size for display on the watch, and share it
to the watch app as an asset. The following examples demonstrate
this pattern.

### Transfer an asset

Create the asset using one of the `create...()` methods in the
[`Asset`](https://developers.google.com/android/reference/com/google/android/gms/wearable/Asset.html) class. Convert a bitmap to a byte array and then call
[`createFromBytes()`](https://developers.google.com/android/reference/com/google/android/gms/wearable/Asset.html#createFromBytes(byte%5B%5D)) to create the asset, as shown in the following
sample.

```
private fun createAssetFromBitmap(bitmap: Bitmap): Asset =
    ByteArrayOutputStream().let { byteStream ->
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteStream)
        Asset.createFromBytes(byteStream.toByteArray())
    }DataLayerActivity.kt
```

Next, attach the asset to a data item with the `putAsset()` method in
[`DataMap`](https://developers.google.com/android/reference/com/google/android/gms/wearable/DataMap.html) or [`PutDataRequest`](https://developers.google.com/android/reference/com/google/android/gms/wearable/PutDataRequest.html). Then put the data item into
the datastore using the [`putDataItem()`](https://developers.google.com/android/reference/com/google/android/gms/wearable/DataApi.html#putDataItem(com.google.android.gms.common.api.GoogleApiClient,%20com.google.android.gms.wearable.PutDataRequest)) method, as shown in the
following samples.

The following sample uses `PutDataRequest`:

```
private fun Context.sendImagePutDataRequest(): Task<DataItem> {

    val asset: Asset = createAssetFromBitmap(BitmapFactory.decodeResource(resources, R.drawable.ic_walk))
    val request: PutDataRequest = PutDataRequest.create("/image").apply {
        putAsset("profileImage", asset)
    }
    val putTask: Task<DataItem> = Wearable.getDataClient(this).putDataItem(request)

    return putTask
}DataLayerActivity.kt
```

The following sample uses `PutDataMapRequest`:

```
private fun Context.sendImagePutDataMapRequest(): Task<DataItem> {

    val asset: Asset = createAssetFromBitmap(BitmapFactory.decodeResource(resources, R.drawable.ic_walk))
    val request: PutDataRequest = PutDataMapRequest.create("/image").run {
        dataMap.putAsset("profileImage", asset)
        asPutDataRequest()
    }
    val putTask: Task<DataItem> = Wearable.getDataClient(this).putDataItem(request)

    return putTask
}DataLayerActivity.kt
```

### Receive assets

After you create an asset, you typically read and extract it on the other side
of the connection. The following example shows how to implement the callback to
detect an asset change and extract the asset:

```
override fun onDataChanged(dataEvents: DataEventBuffer) {
    dataEvents
        .filter { it.type == DataEvent.TYPE_CHANGED && it.dataItem.uri.path == "/image" }
        .forEach { event ->
            val asset = DataMapItem.fromDataItem(event.dataItem)
                .dataMap.getAsset("profileImage")

            asset?.let { safeAsset ->
                lifecycleScope.launch {
                    val bitmap = loadBitmapFromAsset(safeAsset)
                    // Do something with the bitmap
                }
            }
        }
}

private suspend fun loadBitmapFromAsset(asset: Asset): Bitmap? = withContext(Dispatchers.IO) {
    try {
        val assetResult = Wearable.getDataClient(this@DataLayerActivity2)
            .getFdForAsset(asset)
            .await()

        assetResult?.inputStream?.use { inputStream ->
            BitmapFactory.decodeStream(inputStream)
        }
    } catch (e: Exception) {
        e.printStackTrace()
        null
    }
}DataLayerActivity.kt
```

For more information, see the [DataLayer sample project](https://github.com/android/wear-os-samples/tree/main/DataLayer) on GitHub.

Was this helpful?

Content and code samples on this page are subject to the licenses described in the [Content License](https://developer.android.com/license). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-07-15 UTC.




\[\[\["Easy to understand","easyToUnderstand","thumb-up"\],\["Solved my problem","solvedMyProblem","thumb-up"\],\["Other","otherUp","thumb-up"\]\],\[\["Missing the information I need","missingTheInformationINeed","thumb-down"\],\["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"\],\["Out of date","outOfDate","thumb-down"\],\["Samples / code issue","samplesCodeIssue","thumb-down"\],\["Other","otherDown","thumb-down"\]\],\["Last updated 2026-07-15 UTC."\],\[\],\[\]\]