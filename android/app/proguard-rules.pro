# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# ---- Keep rules for Capacitor / WebView bridge ----
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
-keepattributes *Annotation*, JavascriptInterface

-keep class com.getcapacitor.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * { *; }
-keep class * extends com.getcapacitor.Plugin { *; }
-keepclassmembers class * {
    @com.getcapacitor.PluginMethod public *;
}
-keep class org.apache.cordova.** { *; }
-keep class com.ayman.libyarates.** { *; }

# ---- Google Mobile Ads + mediation adapters ----
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.ads.mediation.** { *; }
-keep class com.unity3d.** { *; }
-keep class com.inmobi.** { *; }
-dontwarn com.google.android.gms.**
-dontwarn com.unity3d.**
-dontwarn com.inmobi.**

# ---- R8 missing classes (optional deps referenced by ad SDKs) ----
-dontwarn com.google.android.play.core.**
-dontwarn com.google.firebase.**
-dontwarn com.android.installreferrer.**
-dontwarn com.squareup.picasso.**
-dontwarn com.google.android.gms.common.**
-dontwarn javax.annotation.**
-dontwarn javax.lang.model.**
-dontwarn org.slf4j.**
-dontwarn kotlinx.**
-dontwarn org.bouncycastle.**
-dontwarn org.conscrypt.**
-dontwarn org.conscrypt.Conscrypt
-dontwarn org.conscrypt.OpenSSLProvider
-dontwarn org.openjsse.**
-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn retrofit2.**
-dontwarn androidx.window.**
-dontwarn com.ironsource.**
-dontwarn com.applovin.**
-dontwarn com.vungle.**
-dontwarn com.mbridge.**
-dontwarn com.fyber.**
-dontwarn com.chartboost.**

# Keep AdMob mediation initialization entry points
-keep class com.google.android.gms.ads.MobileAds { *; }
-keep class * implements com.google.android.gms.ads.mediation.MediationAdapter { *; }
-keep class * implements com.google.android.gms.ads.mediation.rtb.RtbAdapter { *; }
