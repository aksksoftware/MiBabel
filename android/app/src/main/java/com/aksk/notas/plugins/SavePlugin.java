package com.aksk.notas.plugins;

import android.content.Intent;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.OutputStream;

@CapacitorPlugin(name = "SavePlugin")
public class SavePlugin extends Plugin {

    private static final String TAG = "SavePlugin";

    @PluginMethod
    public void saveFile(PluginCall call) {
        String fileName = call.getString("fileName");
        String data = call.getString("data");
        String mimeType = call.getString("mimeType");

        if (fileName == null || data == null) {
            call.reject("fileName and data are required");
            return;
        }

        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mimeType != null ? mimeType : "*/*");
        intent.putExtra(Intent.EXTRA_TITLE, fileName);

        startActivityForResult(call, intent, "handleSaveResult");
    }

    @ActivityCallback
    public void handleSaveResult(PluginCall call, ActivityResult result) {
        if (result.getResultCode() == android.app.Activity.RESULT_OK) {
            Intent data = result.getData();
            if (data != null && data.getData() != null) {
                Uri uri = data.getData();
                try {
                    String base64Data = call.getString("data");
                    if (base64Data == null) {
                        call.reject("No data available");
                        return;
                    }
                    byte[] fileBytes = Base64.decode(base64Data, Base64.DEFAULT);
                    OutputStream os = getContext().getContentResolver().openOutputStream(uri);
                    if (os != null) {
                        try {
                            os.write(fileBytes);
                            os.flush();
                        } finally {
                            os.close();
                        }
                        try {
                            Class.forName("android.provider.DocumentsContract")
                                .getMethod("refreshDocument",
                                    android.content.ContentResolver.class,
                                    android.net.Uri.class)
                                .invoke(null, getContext().getContentResolver(), uri);
                        } catch (Exception ignored) {}
                        JSObject ret = new JSObject();
                        ret.put("uri", uri.toString());
                        call.resolve(ret);
                    } else {
                        call.reject("Cannot open output stream");
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error writing file", e);
                    call.reject("Error writing file: " + e.getMessage());
                }
            } else {
                call.reject("No URI in result");
            }
        } else {
            call.reject("User cancelled");
        }
    }
}
