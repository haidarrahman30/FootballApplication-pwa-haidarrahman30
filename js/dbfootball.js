function databasePromise(idb) {
    var dbPromise = idb.open("db_footballpwa", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team_favorit")) {
            var indexFavTeam = upgradeDb.createObjectStore("team_favorit", {
                keyPath: "id"
            });
            indexFavTeam.createIndex("nameTeam", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("player_favorit")) {
            var indexFavPlayer = upgradeDb.createObjectStore("player_favorit", {
                keyPath: "id"
            });
            indexFavPlayer.createIndex("namePlayer", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("match_favorit")) {
            var indexFavMatch = upgradeDb.createObjectStore("match_favorit", {
                keyPath: "id"
            });
            indexFavMatch.createIndex("homeTeam", "match.homeTeam.name", {
                unique: false
            });
            indexFavMatch.createIndex("awayTeam", "match.awayTeam.name", {
                unique: false
            });
        }
    });

    return dbPromise;
}