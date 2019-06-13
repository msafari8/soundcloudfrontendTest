SC.loadImages = (() => {
  /**
   * Given an array of urls, load these images. When they are all loaded (or
   * errored), then resolve a deferred with an array of image elements ready to
   * be drawn onto the canvas.
   *
   * If the returned deferred object is rejected, we should stop loading these
   * images.
   *
   * @param {Array.<String>} urls
   * @return {Object}        Containing a promise with an array of images, as
   *                         well as an abort method which rejects the promise
   */
  function loadImages(urls) {
    let rejectPromise;
    const startTime = Date.now();
    const imageDeferreds = urls.map(loadImage);

    log(`Starting to load ${urls.length} images`);

    const imagesPromise = new Promise((resolve, reject) => {
      rejectPromise = reject;

      Promise.all(imageDeferreds.map(({ promise }) => promise)).then(images => {
        // pick out the Image elements from the resolution values of each
        // promise, and resolve the overall promise with these images.
        resolve(images.filter(Boolean));
      });
    });

    imagesPromise.then(
      () => { log(`Loading ${urls.length} took ${Date.now() - startTime}ms`); },
      () => { log(`Loading ${urls.length} images cancelled`); }
    );

    return {
      promise: imagesPromise,
      abort: () => {
        // Abort all images
        imageDeferreds.forEach(item => item.abort());
        rejectPromise();
      }
    };
  }

  /**
 * Given a single URL, return a deferred which is resolved once the image is
 * loaded or its loading has failed.
 *
 * For our purposes, a failed load is okay. If the load is successful, the
 * promise is resolved with an Image element.
 *
 * @param {String}  url
 * @return {Object} Contains a promise of the image, as well as an abort
 *                  method which should stop the image from loading.
 */
  function loadImage(url, index) {
    let rejectPromise;

    let aborted = false;//define a flag for when abort is called

    const img = new Image();

    const imagePromise = new Promise((resolve, reject) => {
      rejectPromise = reject;

      setTimeout(() => {
        // Wrap it inside a setTimeout
        // So we allow the browser to render correctly, avoding the UI freeze

        //this flag is required to stop the remaining of the loop 
        //as soon as abort is called
        if (aborted) { return true; }

        img.onload = () => { resolve(img) };

        // no img means it failed, but that's okay, we just won't draw it.
        img.onerror = () => { resolve(null) };

        // start loading the image
        img.src = url;
      });
    }).catch(() => { });//always catch unhandled exceptions

    return {
      promise: imagePromise,
      abort: () => {
        //flag it for the rest of images
        aborted = true;
        // ...is it possible to stop the image from loading?
        // Yup, using the following line :)
        img.src = "";

        rejectPromise();
      }
    };
  }

  // for some debugging messages
  function log(str) {
    const listEntry = document.createElement("li");
    const messageLog = document.getElementById("log");

    listEntry.textContent = str;

    messageLog.append(listEntry);
  }

  return loadImages;
})();