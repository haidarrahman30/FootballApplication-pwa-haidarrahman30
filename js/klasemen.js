function hasilKlasemenJSON(data) {
    var tabelKlasemenHTML = ''
    data.standings.forEach(function (klasemen) {
        var dataKlasemen = ''
        klasemen.table.forEach(function (dataKlub) {
            dataKlub = JSON.parse(JSON.stringify(dataKlub).replace(/http:/g, 'https:'));
            dataKlasemen += `<tr>
                <td class="center-align">${dataKlub.position}</td>
                <td class="center-align">
                <a href="./detail_team.html?id=${dataKlub.team.id}">
                    <p class="hide-on-small-only">
                        <img class ="show-on-medium-and-up show-on-medium-and-down a-img-club-klasemen" src=${dataKlub.team.crestUrl}  alt="logo">
                        ${dataKlub.team.name}
                    </p>
                    <p class="hide-on-med-and-up">
                        <img src=${dataKlub.team.crestUrl}  alt="logo" class="a-img-club-klasemen">
                    </p>
                </a>
                </td>
                <td class="center-align">${dataKlub.playedGames}</td>
                <td class="center-align">${dataKlub.won}</td>
                <td class="center-align">${dataKlub.draw}</td>
                <td class="center-align">${dataKlub.lost}</td>
                <td class="center-align">${dataKlub.goalsFor}</td>
                <td class="center-align">${dataKlub.goalsAgainst}</td>
                <td class="center-align">${dataKlub.goalDifference}</td>
                <td class="center-align">${dataKlub.points}</td>
            </tr>`
        })

        tabelKlasemenHTML += `
        <div class="card">
            <div class="card-content">
                <h6 class="a-font-bold a-mb-2">Last Updated: ${convertDate(new Date(data.competition.lastUpdated))}</h6> 
                <table class="responsive-table striped " >
                    <thead>
                    <tr>
                        <th class="center-align">Position</th>
                        <th>Team</th>
                        <th class="center-align">Played</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                        <th class="center-align">Points</th>
                    </tr>
                    </thead>
                    <tbody>` + dataKlasemen + `</tbody>
                </table>
            </div>
        </div>`
    });

    document.getElementById("klasemen-content").innerHTML = tabelKlasemenHTML;
}