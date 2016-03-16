app.controller('ShowController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  console.log("Show controller.");
  $http.get('https://pure-wave-92261.herokuapp.com/movies/movies/' + $routeParams.id).then(function(response) { // SHOW
    $scope.movie = response.data;
    console.log($scope.movie);
  }, function(response) {
    console.log("Error, no data returned.");
  });

  $scope.newComment = function(movie) { // full record is passed from the view
    var comment = {
      commentText: movie.newComment.commentText,
      commentAuthor: movie.newComment.commentAuthor,
      commentTimestamp: Date.now(),
    };
    var comments = movie.comments || [];
    comments.push(comment); // push comment to local $scope
    movie.newComment.commentAuthor = null; // needed to prevent autofilling fields
    movie.newComment.commentText = null; // needed to prevent autofilling fields
    movie.comments = comments; // saves new comment locally
    $http.put('https://pure-wave-92261.herokuapp.com/movies/movies/' + movie._id, movie).then(function(response) { // UPDATE
      console.log("Comment added.");
    }, function(response) {
      console.log("Error, failed to add comment.");
    });
  };

  $scope.deleteComment = function(movie, comment) {
    console.log("Deleting comment.")
    var index = movie.comments.indexOf(comment); // find the index of the comment in the array of comments
    movie.comments.splice(index, 1); // removes the comment from the array
    $http.put('https://pure-wave-92261.herokuapp.com/movies/movies/' + movie._id, movie).then(function(response) { // UPDATE
      console.log("Comment deleted.");
    }, function(response) {
      console.log("Error, comment not deleted.");
    });
  };

  $scope.upLike = function(movie) {
    var movieLikes = movie.movieLikes || 0;
    movie.movieLikes += 1;
    $http.put('https://pure-wave-92261.herokuapp.com/movies/movies/' + movie._id, movie).then(function(response) { // UPDATE
      console.log("Upliked.");
    }, function(response) {
      console.log("Error, like not counted.");
    });
  };

  $scope.downLike = function(movie) {
    var movieLikes = movie.movieLikes || 0;
    movie.movieLikes -= 1;
    $http.put('https://pure-wave-92261.herokuapp.com/movies/movies/' + movie._id, movie).then(function(response) { // UPDATE
      console.log("Downliked.");
    }, function(response) {
      console.log("Error, dislike not counted.");
    });
  };

}]);
