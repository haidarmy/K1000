package com.k1000;

import com.facebook.react.ReactActivity;
import android.content.res.Configuration;/* Fix useScheme() hooks listener */

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "K1000";
  }
  /* Fix useScheme() hooks listener */
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    getReactInstanceManager().onConfigurationChanged(this, newConfig);
  }
}
