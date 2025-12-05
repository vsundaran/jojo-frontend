package com.jojo.acs

import android.widget.FrameLayout
import com.azure.android.communication.calling.ScalingMode
import com.azure.android.communication.calling.VideoStreamRenderer
import com.azure.android.communication.calling.VideoStreamRendererView
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class ACSVideoViewManager : SimpleViewManager<FrameLayout>() {
    override fun getName(): String {
        return "ACSVideoView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
        return FrameLayout(reactContext)
    }

    @ReactProp(name = "participantId")
    fun setParticipantId(view: FrameLayout, participantId: String?) {
        if (participantId == "local") {
            renderLocalVideo(view)
        } else if (participantId != null) {
            renderRemoteVideo(view, participantId)
        }
    }

    private fun renderLocalVideo(view: FrameLayout) {
        val module = ACSCallModule.instance
        val localStream = module?.getLocalVideoStream()
        
        if (localStream != null) {
            try {
                val renderer = VideoStreamRenderer(localStream, view.context)
                val rendererView = renderer.createView()
                view.removeAllViews()
                view.addView(rendererView, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    private fun renderRemoteVideo(view: FrameLayout, participantId: String) {
        val stream = ACSCallModule.remoteVideoStreams[participantId]
        if (stream != null) {
            try {
                val renderer = VideoStreamRenderer(stream, view.context)
                val rendererView = renderer.createView(com.azure.android.communication.calling.CreateViewOptions(ScalingMode.CROP))
                view.removeAllViews()
                view.addView(rendererView, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}
