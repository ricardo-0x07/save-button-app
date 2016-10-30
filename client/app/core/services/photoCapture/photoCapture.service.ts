/// <reference path="../../../../../typings/tsd.d.ts"/>
var jQuery = require('jquery');
const angular = require('angular');

/*@ngInject*/
export function photoCaptureService() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;
  console.log('document', document);
  var ctx = null;
  console.log("ctx", ctx);
  var localMediaStream = null;
  console.log('navigator.mediaDevices', navigator.mediaDevices);
  console.log('navigator', navigator);

  return {
    // AngularJS will instantiate a singleton by calling "new" on this function
    takePhoto() {
      ctx = canvas.getContext('2d');
      console.log('takePhoto');
      console.log('localMediaStream', localMediaStream);
      if (localMediaStream) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(video, 0, 0, width, height);
      }
      return Promise.resolve();
    },
    initPHotoCapture() {
      video = document.querySelector('video');
      console.log("video", video);
      canvas = document.querySelector('canvas');

      console.log('initPHotoCapture');
      // Not showing vendor prefixes or code that works cross-browser.
      var constraints = {
        video: {
          facingMode: {
            exact: "environment"
          },
          width: 1280, height: 720
        },
        "permissions": {
          "video-capture": {
            "description": "Required to capture video using getUserMedia()"
          }
        }
      };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {

          if (navigator.mediaDevices) {
            video.srcObject = stream;
          } else {
            video.src =  window.URL.createObjectURL(stream);
          }
          video.onloadedmetadata = function(e) {
            console.log('onloadedmetadata');
            video.play();
          };
          localMediaStream = stream;

          console.log("video", video);
            console.log('canplay');
            if (!streaming) {
               console.log("video", video);
                console.log("this", this);
              height = video.videoHeight / (video.videoWidth/width);
            
              // Firefox currently has a bug where the height can't be read from
              // the video, so we will make assumptions if this happens.
            
              if (isNaN(height)) {
                height = width / (4/3);
              }
            
              video.setAttribute('width', width);
              video.setAttribute('height', height);
              canvas.setAttribute('width', width);
              canvas.setAttribute('height', height);
              streaming = true;
            }

          console.log('video.srcObject', video.srcObject);
          console.log('video.src', video.src);
          console.log('localMediaStream', localMediaStream);
        })
        .catch(function(error) {
          console.log('init PHoto Capture error', error);
        });

    }
  }
}
export default angular.module('saveButtonAppApp.photoCapture', [])
  .service('photoCapture', photoCaptureService)
  .name;
