function checkData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("Data favorit")
                } else {
                    reject("Bukan data favorit")
                }
            });
    });
}

function createDataFav(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    if (dataType == "player") {
        storeName = "player_favorit";
        dataToCreate = {
            id: data.id,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            counrtyOfBirth: data.counrtyOfBirth,
            nationality: data.nationality,
            position: data.position
        }
    } else if (dataType == "team") {
        storeName = "team_favorit"
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    } else if (dataType == "match") {
        storeName = "match_favorit"
        dataToCreate = {
            id: data.match.id,
            head2head: {
                numberOfMatches: data.head2head.numberOfMatches,
                totalGoals: data.head2head.totalGoals,
                homeTeam: {
                    wins: data.head2head.homeTeam.wins,
                    draws: data.head2head.homeTeam.draws,
                    losses: data.head2head.homeTeam.losses
                },
                awayTeam: {
                    wins: data.head2head.awayTeam.wins,
                    draws: data.head2head.awayTeam.draws,
                    losses: data.head2head.awayTeam.losses
                }
            },
            match: {
                utcDate: data.match.utcDate,
                venue: data.match.venue,
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    }

    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then(function () {
        console.log('Team berhasil disimpan.');
        document.getElementById("iconFav").classList.add('fas');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = " Favorit";
        M.toast({
            html: 'Berhasil Di Favoritkan!'
        });
    }).catch(function () {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
        document.getElementById("iconFav").classList.remove('fas');
        document.getElementById("iconFav").classList.add('far');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = " Tambah Ke Favorit";
        M.toast({
            html: 'Data berhasil dihapus dari Favorit!'
        });
    }).catch(function () {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

function getSavedDataById(dataType) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "team") {
        var dataSquadHTML = ''
        var tableSquadHTML = ''
        getDataById("team_favorit", idParam).then(function (team) {
            resultDetailTeamJSON(team)
            dataTeamJSON = team;
            team.squad.forEach(function (squad) {
                dataSquadJSON = squad;
                dataSquadHTML += `
                <tr>
                    <td>
                    <a href="./detail_player.html?id=${squad.id}"> ${squad.name}</a>
                    </td>
                    <td >${squad.position}</td>
                </tr>
                `
            });
            tableSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`
            document.getElementById("squad").innerHTML = tableSquadHTML;
        })
    } else if (dataType == "player") {
        getDataById("player_favorit", idParam).then(function (player) {
            resultDetailPlayerJSON(player);
        });
    } else if (dataType == "match") {
        getDataById("match_favorit", idParam).then(function (match) {
            resultDetailMatchJSON(match);
        });
    }
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function readDataFavHtml(dataType) {
    if (dataType == "team") {
        getAllData("team_favorit").then(function (data) {
            resultTeamFav(data);
        });
    } else if (dataType == "player") {
        getAllData("player_favorit").then(function (data) {
            resultPlayerFav(data);
        });
    } else if (dataType == "match") {
        getAllData("match_favorit").then(function (data) {
            resultMatchFav(data);
        });
    }
}