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
  // functions that call printTrack via "this.printTrack" break when "library" not used explicitly below - scope issue?
  printTrack: function(trackId) {
    var tracks = library.tracks[trackId];
    console.log(library.generateTrackString(tracks));
  },
  printAllTracks: function(playlistId) {
    var playlists = this.playlists;
    var printTrack = this.printTrack;
    var tracks = this.tracks;
    if (!playlistId) {
      for (var trackId in tracks) {
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
  },
  nextId: function (type) {
    var biggest = 0;
    var returnStr = "";
    var idFor;
    var trackNumber = Object.keys(this.tracks);
    var playlistNumber = Object.keys(this.playlists);

    switch(type) {
      case "t":
        idFor = trackNumber;
        returnStr = "t";
        break;
      case "p":
        idFor = playlistNumber;
        returnStr = "p";
        break;
      default:
        console.log("You didn't select a type!");
    }
    idFor.forEach(function(track) {
      var remFirstLet = track.slice(1);
      if (remFirstLet > biggest) {
        biggest = Number(remFirstLet);
      }
    });
    if (biggest < 10) {
      returnStr += "0" + (biggest + 1);
    } else {
      returnStr += (biggest + 1);
    }
    return returnStr;
  },
  addTrack: function (name, artist, album) {
    var newId = this.nextId("t");
    var newTrack = { id: newId,
                     name: name,
                     artist: artist,
                     album: album
                   };
    var trackObj = this.tracks[newId];
    trackObj = newTrack;
    console.log("Added track: ", trackObj);
  },
  addPlaylist: function (name) {
    var newId = this.nextId("p");
    var newPlaylist = { id: newId,
                        name: name,
                        tracks: []
                      };
    var playObj = library.playlists[newId];
    playObj = newPlaylist;
    console.log("Added playlist: ", playObj);
  },
  printSearchResults: function(query) {
    var queryRegExp = new RegExp(query, "i");
    var tracks = this.tracks;
    var trackString = this.generateTrackString;
    for (var trackId in tracks) {
      var song = tracks[trackId];
      var str = trackString(song);

      if (str.search(queryRegExp) > -1) {
        console.log(str);
      }
    }
  }
};

/*
TESTS:
*/

// library.printTrack("t02")
// library.printAllTracks();
// library.printOnePlaylist("p01");
// library.listPlaylists();
// library.printPlaylist("p01")
// console.log(library.nextId("t"));
// console.log(library.nextId("p"));
// library.addTrack("The first song", "The Artist", "almost too meta");
// library.printSearchResults("a");
