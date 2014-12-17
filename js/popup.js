angular.module('popupApp', ['ui.bootstrap'])

    .controller('MainController', ['$scope', function ($scope) {

        var constants = {
            SC_CONTACT_COOKIE: 'SC_ANALYTICS_GLOBAL_COOKIE',
            SC_VISIT_COOKIE: 'SC_ANALYTICS_SESSION_COOKIE',
            SESSION_COOKIE: 'ASP.NET_SessionId'
        }

        var defaultProfile = { name: 'Default', address: '127.0.0.1' };

        $scope.profiles = localStorage.sc_ip_profiles ? JSON.parse(localStorage.sc_ip_profiles) : [];
        $scope.selectedProfile = localStorage.sc_ip_profile ? JSON.parse(localStorage.sc_ip_profile) : defaultProfile;

        $scope.resetProfile = function () {
            $scope.selectedProfile = defaultProfile;
            localStorage.sc_ip_profile = '';
            console.log('Reset selected profile');
        }

        $scope.setProfile = function (index) {
            $scope.selectedProfile = $scope.profiles[index];
            localStorage.sc_ip_profile = JSON.stringify($scope.profiles[index]);
            console.log('Selected profile: ' + $scope.profiles[index].name);
        }

        $scope.newContact = function () {
            getActiveTab(function (tab) {
                removeCookie(constants.SC_CONTACT_COOKIE, tab.url);
                removeCookie(constants.SC_VISIT_COOKIE, tab.url);
                removeCookie(constants.SESSION_COOKIE, tab.url);
                clearCache();
                reloadTab(tab.id);
            });
        }

        $scope.newVisit = function () {
            getActiveTab(function (tab) {
                removeCookie(constants.SC_VISIT_COOKIE, tab.url);
                removeCookie(constants.SESSION_COOKIE, tab.url);
                clearCache();
                reloadTab(tab.id);
            });
        }

        function removeCookie(cookieName, url) {
            chrome.cookies.remove({
                url: url,
                name: cookieName
            });
            console.log('Removed cookie: ' + cookieName);
        }

        function clearCache() {
            var cache = localStorage.sc_clear_cache ? JSON.parse(localStorage.sc_clear_cache) : true;
            var duration = localStorage.sc_clear_cache_duration ? JSON.parse(localStorage.sc_clear_cache_duration) : '3600000';
            if (cache) {
                chrome.browsingData.removeCache({
                    since: parseInt(duration),
                    originTypes: {
                        unprotectedWeb: true,
                        protectedWeb: true
                    }
                });
                console.log('Cleared cache for duration: ' + duration);
            }
        }

        function reloadTab(tabId) {
            var reload = localStorage.sc_refresh ? JSON.parse(localStorage.sc_refresh) : true;
            if (reload && tabId) {
                chrome.tabs.reload(tabId);
                console.log('Reload tab: ' + tabId);
            }
        }

        function getActiveTab(callback) {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                return callback(tabs[0]);
            });
        }

    }]);