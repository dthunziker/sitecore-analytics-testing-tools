# Sitecore Analytics Testing Tools
> An extension for clearning analytics-related cookies and specifying a forwarded IP address for GeoIP lookups.

![Screenshot](http://i.imgur.com/rc3mOyA.png)

## Cookie Options

###New Contact###

Clears the following Analytics cookies:
<code>SC\_ANALYTICS\_GLOBAL\_COOKIE</code>
<code>SC\_ANALYTICS\_SESSION\_COOKIE</code>
<code>ASP.NET\_SessionId</code>

Optionally reloads the current tab and clears browser cache.

###New Visit###

Clears the following Analytics cookies:
<code>SC\_ANALYTICS\_SESSION\_COOKIE</code>
<code>ASP.NET\_SessionId</code>

Optionally reloads the current tab and clears browser cache.

## GeoIP Options

Sitecore can be configured to resolve the client's IP address using an HTTP header variable. This behavior is controlled by the <code>Analytics.ForwardedRequestHttpHeader</code> setting which is located in the <code>\Includes\Analytics.config</code> config file. Although this setting is typically reserved for load-balanced environments, we can conveniently use it to pass in IP addresses of our choosing. To use this feature, configure this extension to use the same value from the Sitecore.Analytics.config file. Typical values include <code>X-Forwarded-For</code> and <code>X-Real-IP</code>.