function matchData(data) {
  let matchHTML = "";
  let matches = data.matches;

  matches.forEach(match => {
    
    matchHTML += `
        <li>
          <div class="collapsible-header">
            <div class="row center-align">
              <h5>Matchweek ${match.matchday}</h5>
              <div class="col s5"><p class="team-name">${match.homeTeam.name}</p></div>
              <div class="col s2"><p>vs</p></div>
              <div class="col s5"><p class="team-name">${match.awayTeam.name}</p></div>
            </div>
          </div>
          <div class="collapsible-body center-align">
            <p><b>Status</b> ${match.status}</p>
            <p><b>KickOff</b> ${match.utcDate}</p>
            <p><b>Full Time</b></p>
            <p>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</p>
            <p><b>Half Time</b></p>
            <p>${match.score.halfTime.homeTeam} : ${match.score.halfTime.awayTeam}</p>
            <button class="btn waves-effect waves-light btn-add-finish" type="submit" name="action">Add to Favorite</button>
          </div>
        </li>
    `;
  });
  document.getElementById("finished-matches").innerHTML = matchHTML;

  let btn = document.getElementById("finished-matches").getElementsByClassName("btn-add-finish");
  for(let i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
      let saveMatchFinish = {
        id: matches[i].id,
        matchDay: matches[i].matchday,
        homeName: matches[i].homeTeam.name,
        awayName: matches[i].awayTeam.name,
        kickOff: matches[i].utcDate,
        status: matches[i].status,
        scoreFullHome: matches[i].score.fullTime.homeTeam,
        scoreFullAway: matches[i].score.fullTime.awayTeam,
        scoreHalfHome: matches[i].score.halfTime.homeTeam,
        scoreHalfAway: matches[i].score.halfTime.awayTeam,
      }
      addMatchFinish(saveMatchFinish);
    }
  }
}

function matchDataSchedul(data) {
  let matchHTML = "";
  let matches = data.matches;

  matches.forEach(match => {

    if (match.score.fullTime.homeTeam == null && match.score.fullTime.awayTeam == null
      && match.score.halfTime.homeTeam == null && match.score.halfTime.awayTeam == null) {
      match.score.fullTime.homeTeam = 0;
      match.score.fullTime.awayTeam = 0;
      match.score.halfTime.homeTeam = 0;
      match.score.halfTime.awayTeam = 0;
    }

    matchHTML += `
        <li>
          <div class="collapsible-header">
            <div class="row center-align">
              <h5>Matchweek ${match.matchday}</h5>
              <div class="col s5"><p class="team-name">${match.homeTeam.name}</p></div>
              <div class="col s2"><p>vs</p></div>
              <div class="col s5"><p class="team-name">${match.awayTeam.name}</p></div>
            </div>
          </div>
          <div class="collapsible-body center-align">
            <p><b>Status</b> ${match.status}</p>
            <p><b>KickOff</b> ${match.utcDate}</p>
            <p><b>Full Time</b></p>
            <p>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</p>
            <p><b>Half Time</b></p>
            <p>${match.score.halfTime.homeTeam} : ${match.score.halfTime.awayTeam}</p>
            <button class="btn waves-effect waves-light btn-add-scheduled" type="submit" name="action">Add to Favorite</button>
          </div>
        </li>
    `;
  });
  document.getElementById("scheduled-matches").innerHTML = matchHTML;

  let btn = document.getElementById("scheduled-matches").getElementsByClassName("btn-add-scheduled");
  for(let i = 0; i < btn.length; i++) {
    btn[i].onclick = () => {
      let saveMatchFinish = {
        id: matches[i].id,
        matchDay: matches[i].matchday,
        homeName: matches[i].homeTeam.name,
        awayName: matches[i].awayTeam.name,
        kickOff: matches[i].utcDate,
        status: matches[i].status,
        scoreFullHome: matches[i].score.fullTime.homeTeam,
        scoreFullAway: matches[i].score.fullTime.awayTeam,
        scoreHalfHome: matches[i].score.halfTime.homeTeam,
        scoreHalfAway: matches[i].score.halfTime.awayTeam,
      }
      addMatchScheduled(saveMatchFinish);
    }
  }
}