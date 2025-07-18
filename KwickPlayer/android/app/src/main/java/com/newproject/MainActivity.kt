package com.newproject

import android.os.Bundle // Keep this import
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen // <-- **Add this import**

class MainActivity : ReactActivity() {

  /**
   * This is the only onCreate method you need.
   * It handles both React Navigation and the Splash Screen.
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this) // <-- **Show the splash screen here**
    super.onCreate(savedInstanceState) // Use savedInstanceState, not null
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "newProject"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}