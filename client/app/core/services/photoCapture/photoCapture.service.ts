/// <reference path="../../../../../typings/tsd.d.ts"/>
var jQuery = require('jquery');
const angular = require('angular');

/*@ngInject*/
export function photoCaptureService() {
  console.log('document', document);
  var video = document.querySelector('video');
  // var video = angular.element(videoResult);
  console.log("video.height", video.videoHeight);
  console.log("video.width", video.videoWidth);
  console.log("video.height", video.height);
  console.log("video.width", video.width);
  var canvas = document.querySelector('canvas');
  // console.log("canvasResult.getContext('2d')", canvasResult.getContext('2d'));
  // var canvas = angular.element(canvasResult)
  console.log("canvas", canvas);
  var ctx = canvas.getContext('2d');
  console.log("ctx", ctx);
  var localMediaStream = null;
  console.log('MediaDevices', MediaDevices);

  // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  // video.addEventListener('click', takePhoto, false);
  return {
    // AngularJS will instantiate a singleton by calling "new" on this function
    takePhoto() {
      console.log('takePhoto');
      console.log('localMediaStream', localMediaStream);
      if (localMediaStream) {
        ctx.drawImage(video, 0, 0);
        // "image/webp" works in Chrome.
        // Other browsers will fall back to image/png.
        console.log('document', document);
        // var img = document.querySelector('img#photo-op');
        // var img = angular.element(imgResult);
        //   console.log("img", img);
        //   console.log("img.src", img.src);
        //   console.log("canvas.toDataURL('image/webp')", canvas.toDataURL('image/webp'));
        //   console.log(" JSON.stringify canvas.toDataURL('image/webp')", JSON.stringify(canvas.toDataURL('image/webp')));
        //  img.src = canvas.toDataURL('image/webp');
      }
      return Promise.resolve();
    },
    initPHotoCapture() {
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
        .then(function (stream) {
          video.src = window.URL.createObjectURL(stream);
          localMediaStream = stream;
          video.onloadedmetadata = function (e) {
            console.log('onloadedmetadata', onloadedmetadata);
          };;
          console.log('video.src', video.src);
          console.log('localMediaStream', localMediaStream);
        })
        .catch(function errorCallback(error) {
          console.log('take photo error', error);
        });

    }
  }
}
export default angular.module('saveButtonAppApp.photoCapture', [])
  .service('photoCapture', photoCaptureService)
  .name;
