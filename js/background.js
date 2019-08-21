chrome.webRequest.onBeforeSendHeaders.addListener(

    function (details) {

        var header = localStorage.sc_http_header || 'X-Forwarded-For',
            profile = localStorage.sc_ip_profile ? JSON.parse(localStorage.sc_ip_profile) : null;

        if (profile && profile.address) {

            // Remove pre-existing header
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === header) {
                    details.requestHeaders.splice(i, 1);
                    break;
                }
            }

            // Inject header
            details.requestHeaders.push({
                name: header,
                value: profile.address
            });

        }

        return { requestHeaders: details.requestHeaders };

    },
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["blocking", "requestHeaders"]
);
