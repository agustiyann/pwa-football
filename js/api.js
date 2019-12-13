let base_url = "https://api.football-data.org/v2/";
let premier_league = 2021;
let team_uri = `${base_url}teams/`;
let mathes_finished_uri = `${base_url}competitions/${premier_league}/matches?status=FINISHED`;
let mathes_scheduled_uri = `${base_url}competitions/${premier_league}/matches?status=SCHEDULED`;
let standing_uri = `${base_url}competitions/${premier_league}/standings?standingType=TOTAL`;

let fetchApi = function(url) {
  return fetch(url, {
    headers: {
      "X-Auth-Token": "e58f09d7eb0c450f8efd14a3077a67b2"
    }
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getMatchFinished() {
  fetchApi(mathes_finished_uri)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      matchData(data);
    })
    .catch(error);
}

function getMatchScheduled() {
  fetchApi(mathes_scheduled_uri)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      matchDataSchedul(data);
    })
    .catch(error);
}

function getTable() {
  fetchApi(standing_uri)
    .then(status)
    .then(json)
    .then(function(data) {
      data.standings.forEach(function(standing) {
        standing.table.forEach(function(placement) {
          let table = "";
          let logo = placement.team.crestUrl.replace(
            /^http:\/\//i,
            "https://"
          );
          table += `
            <tr>
              <td class="center-align team-name">${placement.position}.</td>
              <td class="center-align">
                <a href="detailclub.html?id=${placement.team.id}"><img src="${logo}" class="logo"></a>
              </td>
              <td>
                <a href="detailclub.html?id=${placement.team.id}">${placement.team.name}</a>
              </td>
              <td class="center-align">${placement.playedGames}</td>
              <td class="center-align">${placement.won}</td>
              <td class="center-align">${placement.draw}</td>
              <td class="center-align">${placement.lost}</td>
              <td class="center-align">${placement.goalDifference}</td>
              <td class="center-align">${placement.points}</td>
            </tr>
          `;

          let content = document.getElementById("list-table").innerHTML + table;
          document.getElementById("list-table").innerHTML = content;
        });
      });

      document.getElementById("last-update").innerHTML = "Last Updated: " + data.competition.lastUpdated;
    })
    .catch(error);
}

function getClubById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  fetchApi(team_uri + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);

      let detailHTML = "";
      let logo = data.crestUrl.replace(
        /^http:\/\//i,
        "https://"
      );
  
      detailHTML +=`
        <div class="row center-align">
          <div class="col s12 m6">
            <img src="${logo}" class="logo-detail responsive-img"></a>
            <h5>${data.name}</h5>
          </div>
          <div class="col s12 m6">
          <table>
            <tr>
              <td class="team-name">Adress</td>
              <td>${data.address}</td>
            </tr>
            <tr>
              <td class="team-name">Email</td>
              <td>${data.email}</td>
            </tr>
            <tr>
              <td class="team-name">Founded</td>
              <td>${data.founded}</td>
            </tr>
            <tr>
              <td class="team-name">Phone</td>
              <td>${data.phone}</td>
            </tr>
            <tr>
              <td class="team-name">Stadium</td>
              <td>${data.venue}</td>
            </tr>
            <tr>
              <td class="team-name">Website</td>
              <td><a href="${data.website}" target="_blank">${data.website}</a></td>
            </tr>
          </table>
          </div>
        </div>
      `;

      let playerTable = "";
      data.squad.forEach(player => {
        playerTable += `
          <li>
            <div class="collapsible-header"><p class="team-name">${player.name}</p></div>
            <div class="collapsible-body">
              <table>
                <tr>
                  <td>Birth</td>
                  <td>${player.countryOfBirth}, ${player.dateOfBirth}</td>
                </tr>
                <tr>
                  <td>Position</td>
                  <td>${player.position}</td>
                </tr>
                <tr>
                  <td>Shirt Number</td>
                  <td>${player.shirtNumber}</td>
                </tr>
              </table>
            </div>
          </li>
        `;
      })

      document.getElementById("detail-club").innerHTML = detailHTML;
      document.getElementById("player-club").innerHTML = playerTable;
    })
    .catch(error);
}
