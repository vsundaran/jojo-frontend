# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# ===========================
# Azure Communication Services
# ===========================
-keep class com.azure.android.communication.** { *; }
-keep interface com.azure.android.communication.** { *; }
-keepclassmembers class com.azure.android.communication.** { *; }

# Keep ACS Calling SDK
-keep class com.azure.android.communication.calling.** { *; }
-keep interface com.azure.android.communication.calling.** { *; }
-dontwarn com.azure.android.communication.**

# ===========================
# WebRTC (Required by ACS Video)
# ===========================
-keep class org.webrtc.** { *; }
-keep interface org.webrtc.** { *; }
-keepclassmembers class org.webrtc.** { *; }
-dontwarn org.webrtc.**

# Keep WebRTC native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# ===========================
# Video Rendering Components
# ===========================
-keep class com.azure.android.communication.calling.VideoStreamRenderer { *; }
-keep class com.azure.android.communication.calling.VideoStreamRendererView { *; }
-keep class com.azure.android.communication.calling.LocalVideoStream { *; }
-keep class com.azure.android.communication.calling.RemoteVideoStream { *; }
-keep class com.azure.android.communication.calling.DeviceManager { *; }

# ===========================
# Kotlin Coroutines
# ===========================
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
-keepclassmembernames class kotlinx.** {
    volatile <fields>;
}

# ===========================
# Custom Native Modules
# ===========================
-keep class com.jojo.acs.** { *; }
-keepclassmembers class com.jojo.acs.** { *; }

# ===========================
# General Rules
# ===========================
# Keep all native methods
-keepclasseswithmembers class * {
    native <methods>;
}

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelables
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}
