package com.aksk.notas;

import android.content.ContentValues;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.aksk.notas.plugins.SavePlugin;
import com.getcapacitor.BridgeActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "MainActivity";

    private class DownloadBridge {
        private Context mContext;
        DownloadBridge(Context context) { mContext = context; }

        @JavascriptInterface
        public void save(String filename, String base64, String mimeType) {
            try {
                byte[] bytes = Base64.decode(base64, Base64.DEFAULT);
                String mime = (mimeType != null && !mimeType.isEmpty()) ? mimeType : "application/octet-stream";

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentValues values = new ContentValues();
                    values.put(MediaStore.Downloads.DISPLAY_NAME, filename);
                    values.put(MediaStore.Downloads.MIME_TYPE, mime);
                    values.put(MediaStore.Downloads.IS_PENDING, 1);

                    Uri uri = mContext.getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                    if (uri != null) {
                        OutputStream os = mContext.getContentResolver().openOutputStream(uri);
                        if (os != null) {
                            os.write(bytes);
                            os.close();
                        }
                        values.clear();
                        values.put(MediaStore.Downloads.IS_PENDING, 0);
                        mContext.getContentResolver().update(uri, values, null, null);
                    } else {
                        Log.e(TAG, "Failed to create MediaStore entry for " + filename);
                    }
                } else {
                    File downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
                    if (downloadsDir != null) {
                        File file = new File(downloadsDir, filename);
                        FileOutputStream fos = new FileOutputStream(file);
                        fos.write(bytes);
                        fos.close();
                    } else {
                        Log.e(TAG, "Failed to get Downloads directory");
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Error saving file: " + filename, e);
            }
        }
    }

    private class AppInfoBridge {
        private Context mContext;
        AppInfoBridge(Context context) { mContext = context; }

        @JavascriptInterface
        public String getVersionName() {
            try {
                PackageInfo info = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0);
                return info.versionName;
            } catch (Exception e) {
                return "unknown";
            }
        }
        @JavascriptInterface
        public int getVersionCode() {
            try {
                PackageInfo info = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                    return (int) info.getLongVersionCode();
                } else {
                    return info.versionCode;
                }
            } catch (Exception e) {
                return 0;
            }
        }
        @JavascriptInterface
        public long getBuildDate() {
            try {
                return new File(mContext.getPackageManager().getApplicationInfo(mContext.getPackageName(), 0).publicSourceDir).lastModified();
            } catch (Exception e) {
                return 0;
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(SavePlugin.class);
        super.onCreate(savedInstanceState);
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.addJavascriptInterface(new DownloadBridge(this), "AndroidDownloader");
            webView.addJavascriptInterface(new AppInfoBridge(this), "AndroidAppInfo");
        }
    }
}
