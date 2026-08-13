package com.aksk.notas;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppBridge bridge = new AppBridge(this);
        getBridge().getWebView().addJavascriptInterface(bridge, "AndroidDownloader");
        getBridge().getWebView().addJavascriptInterface(bridge, "AndroidBridge");
    }
}
