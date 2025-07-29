package com.churchapp

import org.devio.rn.splashscreen.SplashScreen 
import android.os.Bundle // It's good practice to have this for onCreate
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * This is where you show the splash screen.
   * It needs to be the first line in this method.
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this)  // <-- **ADD THIS LINE**
    super.onCreate(savedInstanceState) // <-- **CHANGE null to savedInstanceState**
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Shepherd Care"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}