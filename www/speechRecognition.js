'use strict';

module.exports = {
  isRecognitionAvailable: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'SpeechRecognition', 'isRecognitionAvailable', []);
  },
  startListening: function (successCallback, errorCallback, options) {
    options = options || {};

    if (options.continuousMode !== undefined && options.continuousMode === true) {
      cordova.exec(function (data) {
        var response = JSON.parse(data);
        // Note that you need to add some way of conditional to know wheter the continuous mode is used or the simple mode
        if (response.event == "speech.onend") {
          // Note that you need to wait 500ms, otherwise the error "recognition busy" will be triggered.
          setTimeout(function () {
            // Restart the recognition with the callbacks 
            window.plugins.speechRecognition.startListening(successCallback, errorCallback, options);
          }, 500);
        }
        else if (response.event == "speech.onresults") {
          console.log("Hey something was recognized, check out : ", response.matches);
        }

      }, errorCallback, 'SpeechRecognition', 'startListening', 
                        [options.language, options.matches, options.prompt, 
                         options.showPartial, options.showPopup, options.continuousMode, options.muteBeep]);
    } else {
      cordova.exec(successCallback, errorCallback, 'SpeechRecognition', 'startListening', [options.language, options.matches, options.prompt, options.showPartial, options.showPopup, options.continuousMode]);
    }
  },
  stopListening: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'SpeechRecognition', 'stopListening', []);
  },
  getSupportedLanguages: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'SpeechRecognition', 'getSupportedLanguages', []);
  },
  hasPermission: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'SpeechRecognition', 'hasPermission', []);
  },
  requestPermission: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'SpeechRecognition', 'requestPermission', []);
  }
};
