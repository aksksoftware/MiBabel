package com.aksk.notas;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.view.WindowInsets;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class AppBridge {

    private static final String TAG = "AppBridge";
    private final Activity activity;

    public AppBridge(Activity activity) {
        this.activity = activity;
    }

    @JavascriptInterface
    public void save(String nombre, String base64, String mime) {
        try {
            if (nombre == null || base64 == null) return;
            byte[] data = Base64.decode(base64, Base64.DEFAULT);
            String safeName = sanitizeFileName(nombre);
            String mimeType = (mime == null || mime.isEmpty()) ? "application/octet-stream" : mime;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                saveToMediaStore(safeName, mimeType, data);
            } else {
                saveToLegacyDir(safeName, data);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error saving file", e);
        }
    }

    private void saveToMediaStore(String nombre, String mimeType, byte[] data) throws Exception {
        ContentValues values = new ContentValues();
        values.put(MediaStore.Downloads.DISPLAY_NAME, nombre);
        values.put(MediaStore.Downloads.MIME_TYPE, mimeType);
        values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
        values.put(MediaStore.Downloads.IS_PENDING, 1);
        Uri uri = activity.getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
        if (uri == null) throw new IllegalStateException("Could not create MediaStore entry");
        OutputStream os = activity.getContentResolver().openOutputStream(uri);
        if (os != null) {
            try {
                os.write(data);
            } finally {
                os.close();
            }
        }
        values.clear();
        values.put(MediaStore.Downloads.IS_PENDING, 0);
        activity.getContentResolver().update(uri, values, null, null);
    }

    private void saveToLegacyDir(String nombre, byte[] data) throws Exception {
        File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        if (!dir.exists()) dir.mkdirs();
        File file = new File(dir, nombre);
        FileOutputStream fos = new FileOutputStream(file);
        try {
            fos.write(data);
        } finally {
            fos.close();
        }
    }

    @JavascriptInterface
    public int getStatusBarHeight() {
        float density = activity.getResources().getDisplayMetrics().density;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsets insets = activity.getWindow().getDecorView().getRootWindowInsets();
            if (insets != null) {
                android.graphics.Insets ci = insets.getInsets(WindowInsets.Type.statusBars());
                return Math.round(ci.top / density);
            }
            return 0;
        }
        int resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            return Math.round(activity.getResources().getDimensionPixelSize(resourceId) / density);
        }
        return 0;
    }

    private String sanitizeFileName(String name) {
        String clean = name.replaceAll("[/\\\\:*?\"<>|]", "_").trim();
        return clean.isEmpty() ? "archivo" : clean;
    }
}
