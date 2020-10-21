const base_url = "https://api.football-data.org/v2/";
const liga = 2021; // Liga Premiere Inggris
const standings = `${base_url}competitions/${liga}/standings?standingType=TOTAL`;
const jadwal_upcoming = `${base_url}competitions/${liga}/matches?status=SCHEDULED&limit=20`;
const tanding = `${base_url}matches/`;
const team = `${base_url}teams/`;
const pemain = `${base_url}players/`

const fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '01f1b418d58849889e984e3b657a9c12' //didapat dari token register API pada football-data.org
        }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}


function getKlasemen() {
    if ('caches' in window) {
        caches.match(standings).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    hasilKlasemenJSON(data);
                });
            }
        });
    }

    fetchApi(standings)
        .then(status)
        .then(json)
        .then(function(data) {
            hasilKlasemenJSON(data)
        })
        .catch(error);
}

function getMatchLeague() {
    return new Promise(function(resolve, reject) {

        if ('caches' in window) {
            caches.match(jadwal_upcoming).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        resultMatchJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(jadwal_upcoming)
            .then(status)
            .then(json)
            .then(function(data) {
                resultMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailTeamById() {
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        const dataSquadHTML = ''
        const tableSquadHTML = ''
        if ("caches" in window) {
            caches.match(team + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        resultDetailTeamJSON(data)
                        data.squad.forEach(function(squad, index) {
                            dataSquadJSON = squad;
                            dataSquadHTML += `
                            <tr>
                                <td><a href="./detailplayer.html?id=${squad.id}"> ${squad.name}</a></td>
                                <td >${squad.position}</td>
                            </tr>`
                        });
                        tableSquadHTML += `<table><tbody> ${dataSquadHTML}  </tbody></table>`
                        document.getElementById("squad").innerHTML = tableSquadHTML;
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(team + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                resultDetailTeamJSON(data)
                dataTeamJSON = data;
                data.squad.forEach(function(squad, index) {
                    dataSquadJSON = squad;
                    dataSquadHTML += `
                    <tr>
                        <td>${index+1}. </td>
                        <td><a href="./detail_player.html?id=${squad.id}"> ${squad.name}</a></td>
                        <td>${squad.position}</td>
                    </tr>`
                });
                tableSquadHTML += `
                <table>
                    <thead>
                        <tr>
                            <td class="a-font-bold">No</td>
                            <td class="a-font-bold">Name</td>
                            <td class="a-font-bold">Position</td>
                        </tr>
                    </thead>
                    <tbody> ${dataSquadHTML}  </tbody>
                </table>`

                document.getElementById("squad").innerHTML = tableSquadHTML;
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailPlayerById() {
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(pemain + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        resultDetailPlayerJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(pemain + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                resultDetailPlayerJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailMatchById() {
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(tanding + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        resultDetailMatchJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(tanding + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                resultDetailMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}