package com.jojo.acs

import android.util.Log
import android.view.View
import android.widget.FrameLayout
import com.azure.android.communication.calling.CreateViewOptions
import com.azure.android.communication.calling.ScalingMode
import com.azure.android.communication.calling.VideoStreamRenderer
import com.azure.android.communication.calling.VideoStreamRendererView
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class ACSVideoViewManager : SimpleViewManager<FrameLayout>() {
    
    companion object {
        private const val TAG = "ACSVideoView"
        // Store renderers to prevent recreation and memory leaks
        private val localRenderers = mutableMapOf<Int, VideoStreamRenderer>()
        private val remoteRenderers = mutableMapOf<String, VideoStreamRenderer>()
    }
    
    override fun getName(): String {
        return "ACSVideoView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
        Log.d(TAG, "Creating new FrameLayout for video view")
        return FrameLayout(reactContext)
    }

    @ReactProp(name = "participantId")
    fun setParticipantId(view: FrameLayout, participantId: String?) {
        Log.d(TAG, "setParticipantId called with: $participantId")
        
        if (participantId.isNullOrEmpty()) {
            Log.w(TAG, "participantId is null or empty, clearing view")
            view.removeAllViews()
            return
        }
        
        // Run on UI thread to ensure thread safety
        view.post {
            try {
                if (participantId == "local") {
                    renderLocalVideo(view)
                } else {
                    renderRemoteVideo(view, participantId)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Error setting participantId: ${e.message}", e)
            }
        }
    }

    private fun renderLocalVideo(view: FrameLayout) {
        val module = ACSCallModule.instance
        val localStream = module?.getLocalVideoStream()
        
        if (localStream == null) {
            Log.w(TAG, "Local video stream is null, cannot render")
            return
        }
        
        try {
            val viewId = view.id
            
            // Reuse existing renderer if available
            var renderer = localRenderers[viewId]
            
            if (renderer == null) {
                Log.d(TAG, "Creating new local video renderer")
                renderer = VideoStreamRenderer(localStream, view.context)
                localRenderers[viewId] = renderer
            } else {
                Log.d(TAG, "Reusing existing local video renderer")
            }
            
            // Create renderer view with proper scaling
            val options = CreateViewOptions(ScalingMode.CROP)
            val rendererView = renderer.createView(options)
            
            // Clear previous views and add new renderer view
            view.removeAllViews()
            view.addView(
                rendererView,
                FrameLayout.LayoutParams(
                    FrameLayout.LayoutParams.MATCH_PARENT,
                    FrameLayout.LayoutParams.MATCH_PARENT
                )
            )
            
            Log.d(TAG, "Local video renderer attached successfully")
            
        } catch (e: Exception) {
            Log.e(TAG, "Error rendering local video: ${e.message}", e)
            e.printStackTrace()
        }
    }

    private fun renderRemoteVideo(view: FrameLayout, participantId: String) {
        val stream = ACSCallModule.remoteVideoStreams[participantId]
        
        if (stream == null) {
            Log.w(TAG, "Remote video stream for participant $participantId is null")
            return
        }
        
        try {
            // Reuse existing renderer if available
            var renderer = remoteRenderers[participantId]
            
            if (renderer == null) {
                Log.d(TAG, "Creating new remote video renderer for participant: $participantId")
                renderer = VideoStreamRenderer(stream, view.context)
                remoteRenderers[participantId] = renderer
            } else {
                Log.d(TAG, "Reusing existing remote video renderer for participant: $participantId")
            }
            
            // Create renderer view with proper scaling
            val options = CreateViewOptions(ScalingMode.CROP)
            val rendererView = renderer.createView(options)
            
            // Clear previous views and add new renderer view
            view.removeAllViews()
            view.addView(
                rendererView,
                FrameLayout.LayoutParams(
                    FrameLayout.LayoutParams.MATCH_PARENT,
                    FrameLayout.LayoutParams.MATCH_PARENT
                )
            )
            
            Log.d(TAG, "Remote video renderer attached successfully for participant: $participantId")
            
        } catch (e: Exception) {
            Log.e(TAG, "Error rendering remote video for participant $participantId: ${e.message}", e)
            e.printStackTrace()
        }
    }
    
    override fun onDropViewInstance(view: FrameLayout) {
        super.onDropViewInstance(view)
        
        Log.d(TAG, "Cleaning up video view")
        
        // Clean up local renderer for this view
        val viewId = view.id
        localRenderers[viewId]?.let { renderer ->
            try {
                renderer.dispose()
                localRenderers.remove(viewId)
                Log.d(TAG, "Disposed local video renderer")
            } catch (e: Exception) {
                Log.e(TAG, "Error disposing local renderer: ${e.message}", e)
            }
        }
        
        view.removeAllViews()
    }
    
    // Call this when call ends to clean up all renderers
    fun cleanupAllRenderers() {
        Log.d(TAG, "Cleaning up all video renderers")
        
        localRenderers.values.forEach { renderer ->
            try {
                renderer.dispose()
            } catch (e: Exception) {
                Log.e(TAG, "Error disposing local renderer: ${e.message}", e)
            }
        }
        localRenderers.clear()
        
        remoteRenderers.values.forEach { renderer ->
            try {
                renderer.dispose()
            } catch (e: Exception) {
                Log.e(TAG, "Error disposing remote renderer: ${e.message}", e)
            }
        }
        remoteRenderers.clear()
        
        Log.d(TAG, "All video renderers cleaned up")
    }
}
