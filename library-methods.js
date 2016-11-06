var library = {
  tracks: { t01: { id: "t01",
                   name: "Code Monkey",
                   artist: "Jonathan Coulton",
                   album: "Thing a Week Three" },
            t02: { id: "t02",
                   name: "Model View Controller",
                   artist: "James Dempsey",
                   album: "WWDC 2003"},
            t03: { id: "t03",
                   name: "Four Thirty-Three",
                   artist: "John Cage",
                   album: "Woodstock 1952"}
          },
  playlists: { p01: { id: "p01",
                      name: "Coding Music",
                      tracks: ["t01", "t02"]
                    },
               p02: { id: "p02",
                      name: "Other Playlist",
                      tracks: ["t03"]
                    }
             },
  generatePlaylistString: function(pId) {
    var pIdstring = pId.id + ": " + pId.name + " - " + pId.tracks.length + " track";
    if (pId.tracks.length > 1) pIdstring += "s";
    return pIdstring;
  },
  printOnePlaylist: function(pId) {
    var playlist = this.playlists[pId];
    console.log(this.generatePlaylistString(playlist));
  },
  listPlaylists: function() {
    for (var pId in this.playlists) {
      this.printOnePlaylist(pId);
    }
  },
  generateTrackString: function(track) {
    var trackString = track.id + ": " + track.name + " by " + track.artist + "(" + track.album + ")";
    return trackString;
  },
  printTrack: function(trackId) {
    var track = this.tracks[trackId];
    console.log(this.generateTrackString(track));
  },
  printAllTracks: function(playlistId) {
    var playlists = this.playlists
    var printTrack = this.printTrack;
    if (!playlistId) {
      for (var trackId in lib.tracks) {
        printTrack(trackId);
      }
    } else {
      var trackIds = playlists[playlistId].tracks;
      trackIds.forEach(function(trackId) {
        printTrack(trackId);
      });
    }
  },
  printPlaylist: function(playlistId) {
    this.printOnePlaylist(playlistId);
    this.printAllTracks(playlistId);
    }
};

// library.printPlaylist("p01")
// library.printTrack("t02")
// library.printAllTracks();
// library.listPlaylists();
// library.printOnePlaylist("p01");