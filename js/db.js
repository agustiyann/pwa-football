let dbPromise = idb.open("pwadb", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("saved_machweek")) {
    let matchFav = upgradeDb.createObjectStore("saved_machweek");
    matchFav.createIndex("id", "id", {unique: true});
  }
  if (!upgradeDb.objectStoreNames.contains("saved_schedule")) {
    let matchFav = upgradeDb.createObjectStore("saved_schedule");
    matchFav.createIndex("id", "id", {unique: true});
  }
});

/** Match Finish */
function addMatchFinish(match) {
  console.log(match.id);
  dbPromise.then(function (db) {
    var tx = db.transaction('saved_machweek', 'readwrite');
    var store = tx.objectStore('saved_machweek');

    store.put(match, match.id);

    return tx.complete;
  })
  .then(function () {
    console.log('MatchFinished berhasil disimpan.');
  })
  .catch(function() {
    console.log('Gagal menyimpan match');
  })
}

function deleteMatchFinish(match) {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_machweek", "readwrite");
    let store = tx.objectStore("saved_machweek");

    store.delete(match, match.id);
    return tx.complete;
  })
  .then(function() {
    console.log('Match dihapus');
  });
}

function getMatchFinishSaved() {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_machweek", "readonly");
    let store = tx.objectStore("saved_machweek");

    // mengambil primary key
    return store.getAll();
  })
  .then(function (matches) {
    console.log(matches);
    let matchHTML = "";
    // let matches = data.matches;

    matches.forEach(match => {

      matchHTML += `
          <li>
            <div class="collapsible-header">
              <div class="row center-align">
                <h5>Matchweek ${match.matchDay}</h5>
                <div class="col s5"><p class="team-name">${match.homeName}</p></div>
                <div class="col s2"><p>vs</p></div>
                <div class="col s5"><p class="team-name">${match.awayName}</p></div>
              </div>
            </div>
            <div class="collapsible-body center-align">
              <p><b>Status</b> ${match.status}</p>
              <p><b>KickOff</b> ${match.kickOff}</p>
              <p><b>Full Time</b></p>
              <p>${match.scoreFullHome} : ${match.scoreFullAway}</p>
              <p><b>Half Time</b></p>
              <p>${match.scoreHalfHome} : ${match.scoreHalfAway}</p>
              <button class="btn waves-effect waves-light btn-del-finish" type="submit" name="action">Remove</button>
            </div>
          </li>
      `;
    });

    document.getElementById("finished-matches-saved").innerHTML = matchHTML;

    let btn = document.getElementById("finished-matches-saved").getElementsByClassName("btn-del-finish");
    for(let i = 0; i < btn.length; i++) {
      btn[i].onclick = () => {
        deleteMatchFinish(matches[i].id);
        getMatchFinishSaved();
      }
    }
    });
}

/** Match Schedule */
function addMatchScheduled(match) {
  console.log(match.id);
  dbPromise.then(function (db) {
    var tx = db.transaction('saved_schedule', 'readwrite');
    var store = tx.objectStore('saved_schedule');

    store.put(match, match.id);

    return tx.complete;
  })
  .then(function () {
    console.log('MatchScheduled berhasil disimpan.');
  })
  .catch(function() {
    console.log('Gagal menyimpan match');
  })
}

function deleteMatchScheduled(match) {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_schedule", "readwrite");
    let store = tx.objectStore("saved_schedule");

    store.delete(match, match.id);
    return tx.complete;
  })
  .then(function() {
    console.log('Match dihapus');
  });
}

function getMatchScheduledSaved() {
  dbPromise.then(function (db) {
    let tx = db.transaction("saved_schedule", "readonly");
    let store = tx.objectStore("saved_schedule");

    // mengambil primary key
    return store.getAll();
  })
  .then(function (matches) {
    console.log(matches);
    let matchScheduleHTML = "";
    // let matches = data.matches;

    matches.forEach(match => {

      matchScheduleHTML += `
          <li>
            <div class="collapsible-header">
              <div class="row center-align">
                <h5>Matchweek ${match.matchDay}</h5>
                <div class="col s5"><p class="team-name">${match.homeName}</p></div>
                <div class="col s2"><p>vs</p></div>
                <div class="col s5"><p class="team-name">${match.awayName}</p></div>
              </div>
            </div>
            <div class="collapsible-body center-align">
              <p><b>Status</b> ${match.status}</p>
              <p><b>KickOff</b> ${match.kickOff}</p>
              <p><b>Full Time</b></p>
              <p>${match.scoreFullHome} : ${match.scoreFullAway}</p>
              <p><b>Half Time</b></p>
              <p>${match.scoreHalfHome} : ${match.scoreHalfAway}</p>
              <button class="btn waves-effect waves-light btn-del-schedule" type="submit" name="action">Remove</button>
            </div>
          </li>
      `;
    });

    document.getElementById("scheduled-matches-saved").innerHTML = matchScheduleHTML;

    let btn = document.getElementById("scheduled-matches-saved").getElementsByClassName("btn-del-schedule");
    for(let i = 0; i < btn.length; i++) {
      btn[i].onclick = () => {
        deleteMatchScheduled(matches[i].id);
        getMatchScheduledSaved();
      }
    }
    });
}