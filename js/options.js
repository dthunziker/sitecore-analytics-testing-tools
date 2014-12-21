angular.module('optionsApp', ['ui.bootstrap'])

    .controller('ProfileController', ['$scope', '$filter', function ($scope, $filter) {

        $scope.profiles = localStorage.sc_ip_profiles ? JSON.parse(localStorage.sc_ip_profiles) : [];

        $scope.addProfile = function () {

            // Require fields
            if (!$scope.profileName || !$scope.profileAddress) {
                alert('Please enter a profile name and associated IP address.');
                return;
            }

            // Ensure uniqueness
            var dup = $filter('filter')($scope.profiles, { name: $scope.profileName.trim() })[0];
            if ($scope.profileName.toLowerCase().trim() === 'default' || dup) {
                alert('Duplicate profile name. Please choose something unique.');
                return;
            }

            // Save
            $scope.profiles.push({ name: $scope.profileName.trim(), address: $scope.profileAddress.trim() });
            localStorage.sc_ip_profiles = JSON.stringify($scope.profiles);

            // Reset form
            $scope.profileName = '';
            $scope.profileAddress = '';

        };

        $scope.removeProfile = function (index) {
            var profile = $scope.profiles.splice(index, 1);
            localStorage.sc_ip_profiles = JSON.stringify($scope.profiles);

            // Clear selected profile if it was the one being deleted
            console.log(localStorage.sc_ip_profile);
            if (localStorage.sc_ip_profile) {
                var selectedProfile = JSON.parse(localStorage.sc_ip_profile);
                if (selectedProfile.name === profile[0].name) {
                    localStorage.sc_ip_profile = '';
                }
            }
        }

    }])

    .controller('HeaderController', ['$scope', function ($scope) {

        $scope.header = localStorage.sc_http_header || 'X-Forwarded-For';

        $scope.$watch('header', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                localStorage.sc_http_header = newValue;
            }
        });

    }])

    .controller('CookieController', ['$scope', function ($scope) {

        $scope.cache = localStorage.sc_clear_cache ? JSON.parse(localStorage.sc_clear_cache) : true;
        $scope.cacheDuration = localStorage.sc_clear_cache_duration ? JSON.parse(localStorage.sc_clear_cache_duration) : '3600000';
        $scope.refresh = localStorage.sc_refresh ? JSON.parse(localStorage.sc_refresh) : true;

        $scope.save = function () {
            localStorage.sc_clear_cache = JSON.stringify($scope.cache);
            localStorage.sc_clear_cache_duration = JSON.stringify($scope.cacheDuration);
            localStorage.sc_refresh = JSON.stringify($scope.refresh);
        };

    }]);