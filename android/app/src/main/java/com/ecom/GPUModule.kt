package com.ecom

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.app.ActivityManager
import android.content.Context
import android.opengl.GLES10
import com.facebook.react.bridge.Callback

class GPUModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "GPUModule"
    }

    @ReactMethod
    fun getGPUDetails(callback: Callback) {
        val activityManager = reactApplicationContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val configurationInfo = activityManager.deviceConfigurationInfo

        val glVersion = configurationInfo.glEsVersion
        val renderer = GLES10.glGetString(GLES10.GL_RENDERER)
        val vendor = GLES10.glGetString(GLES10.GL_VENDOR)

        val gpuInfo = "OpenGL Version: $glVersion\nRenderer: $renderer\nVendor: $vendor"
        callback.invoke(null, gpuInfo)
    }
}
