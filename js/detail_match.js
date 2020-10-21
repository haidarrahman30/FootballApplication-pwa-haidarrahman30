function resultDetailMatchJSON(data) {
    var matchDay = data.match.matchday;
    var kickOff = convertDate(new Date(data.match.utcDate));
    var homeTeamName = data.match.homeTeam.name;
    var awayTeamName = data.match.awayTeam.name;
    var numberOfMatches = data.head2head.numberOfMatches;
    var totalGoals = data.head2head.totalGoals;
    var homeTeamWins = data.head2head.homeTeam.wins;
    var awayTeamWins = data.head2head.awayTeam.wins;
    var homeTeamDraws = data.head2head.homeTeam.draws;
    var awayTeamDraws = data.head2head.awayTeam.draws;
    var homeTeamLosses = data.head2head.homeTeam.losses;
    var awayTeamLosses = data.head2head.awayTeam.losses;
    var venue = data.match.venue;

    document.getElementById("a-matchDay").innerHTML = `Matchday : ${matchDay}`;
    document.getElementById("a-kickOff").innerHTML = `Kick Off : ${kickOff}`;
    document.getElementById("a-homeTeamName").innerHTML = homeTeamName;
    document.getElementById("a-awayTeamName").innerHTML = awayTeamName;
    document.getElementById("a-numberOfMatches").innerHTML = `Number Of Matches: ${numberOfMatches}`;
    document.getElementById("a-totalGoals").innerHTML = `Total Goals: ${totalGoals}`;
    document.getElementById("a-homeTeamWins").innerHTML = homeTeamWins;
    document.getElementById("a-awayTeamWins").innerHTML = awayTeamWins;
    document.getElementById("a-homeTeamDraws").innerHTML = homeTeamDraws;
    document.getElementById("a-awayTeamDraws").innerHTML = awayTeamDraws;
    document.getElementById("a-homeTeamLosses").innerHTML = homeTeamLosses;
    document.getElementById("a-awayTeamLosses").innerHTML = awayTeamLosses;
    document.getElementById("a-venue").innerHTML = venue;
    document.getElementById("a-preloader").innerHTML = '';
}

function resultMatchFav(data) {
    var dataMatchFavHtml = ''
    data.forEach(function(match) {
        dataMatchFavHtml += `
    <div class="col s12 m6 l6">
        <div class="card">
            <div class="card-content">
                <div center-align>
                    <h5 class="center-align">Matchday : ${match.match.matchday}</h5>
                    <div class="center-align">Kick Off : ${convertDate(new Date(match.match.utcDate))}</div>

                    <div class="row" style="margin:20px">
                        <div class="col s5 truncate right-align">
                            <span class="blue-text text-darken-2">  ${match.match.homeTeam.name}</span>
                        </div>
                        <div class="col s2 ">
                            VS
                        </div>
                        <div class="col s5 truncate left-align">
                            <span class="blue-text text-darken-2">  ${match.match.awayTeam.name}</span>
                        </div>
                    </div>
                    <div class="center-align">
                        <a class="blue waves-effect waves-light btn" href="./detail_match.html?id=${match.id}">Lihat Detail</a>
                    </div>  
                </div>
            </div>
        </div>
    </div>`
    });

    document.getElementById("a-favorit-load").innerHTML = dataMatchFavHtml;
}