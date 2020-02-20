// Service worker with 'COEP: require-corp' response header.
// This service worker issues a netwrok request for a resource with or without
// CORP response header.

importScripts("/common/get-host-info.sub.js");

self.addEventListener('message', e => {
  e.waitUntil((async () => {
    let result;
    try {
      let response;
      if (e.data === 'WithCorp') {
        response = await fetch(
          get_host_info().HTTPS_REMOTE_ORIGIN +
          "/html/cross-origin-embedder-policy/resources/" +
          "nothing-cross-origin-corp.txt", { mode: "no-cors" });
      }
      if (e.data === 'WithoutCorp') {
        response = await fetch(
          get_host_info().HTTPS_REMOTE_ORIGIN + "/common/blank.html",
          { mode: "no-cors" });
      }
      result = response.type;
    } catch (error) {
      result = `${error.name}: ${error.message}`;
    } finally {
      e.source.postMessage(result);
    }
  })());
});
