function checkInplayStatus(openDate){
    const specifiedDate = new Date(openDate);
    const currentDate = new Date();
    const specifiedDateDate = new Date(specifiedDate.getFullYear(), specifiedDate.getMonth(), specifiedDate.getDate());
    const currentDateDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    return specifiedDateDate.getTime() === currentDateDate.getTime() && specifiedDate > currentDate;
}

async function getCricketMatch(){
    const response = await fetch("http://localhost:7074/exuser/getsportid/4");
    const cricketmatches = await response.json();
    showCricketMatch(cricketmatches);
  }
  
  function showCricketMatch(cricketmatches){
    let content = document.getElementById("content");
    content.innerHTML = "";
    for (let i = 0; i < cricketmatches.length; i++) {
      let child = cricketmatches[i];
      let inplaystatus=checkInplayStatus(child.openDate);
      content.innerHTML += `<tr>
                              <th>
                                  <i class="fa fa-circle" aria-hidden="true"></i>
                                  <a href="/user/matchodds/4/${child.eventId}">
                                      ${child.eventName}
                                      <span class="play">${inplaystatus? 'In-Play' : child.openDate}</span>
                                      <i class="fas fa-alarm-clock"></i>
                                      <span class="streamingIcon"></span>
                                  </a>
                              </th>
                              <td>
                                  <div class="col-div">
                                      <input type="button" value="${child.odds[0].b1}" class="blue">
                                      <input type="button" value="${child.odds[0].l1}" class="pink">
                                  </div>
                              </td>
                              <td>
                                  <div class="col-div">
                                      <input type="button" value="${child.odds[0].b2}" class="blue">
                                      <input type="button" value="${child.odds[0].l2}" class="pink">
                                  </div>
                              </td>
                              <td>
                                  <div class="col-div">
                                      <input type="button" value="${child.odds[0].b3}" class="blue">
                                      <input type="button" value="${child.odds[0].l3}" class="pink">
                                  </div>
                              </td>
                              <td>
                                  <i class="fas fa-thumbtack"></i>
                              </td>
                          </tr>`;
      }
      getCompetitionName();
  }
  
  getCricketMatch();

 async function getCompetitionName(){
    const response = await fetch("http://localhost:7074/exuser/competitionList/4");
    const competitionData = await response.json();
    showCompetitionName(competitionData);
  }

  function showCompetitionName(competitionData) { 
    let competitionListElement = document.getElementById("competationContent");
    competitionListElement.innerHTML = "";
    for (let i = 0; i < competitionData.length; i++) {
        let competition = competitionData[i];
        let listItem = document.createElement("li");
        listItem.style.cursor="pointer";
        let link = document.createElement("a");
        link.textContent = competition;
        link.addEventListener("click", function () {
            makeApiRequest(competition);
        });
        listItem.appendChild(link);
        let icon = document.createElement("i");
        icon.className = "fa fa-angle-right";
        listItem.appendChild(icon);
        competitionListElement.appendChild(listItem);
    }
  }
  
async function makeApiRequest(competition){
    const response = await fetch(`http://localhost:7074/exuser/getByCompetitionName/${competition}`);
    const competitionData = await response.json();
    let competitionListElement = document.getElementById("competationContent");
    competitionListElement.innerHTML = "";
    if(competitionData.length === 0){
        competitionListElement.innerHTML = `<li><a style="text-decoration: none;" href="/user/matchodds">Match Odds</a><i class="fa fa-angle-right"></i></li>`;
    }
    for (let i = 0; i < competitionData.length; i++) {
        let competition = competitionData[i].eventName;
        let listItem = document.createElement("li");
        listItem.style.cursor="pointer";
        let link = document.createElement("a");
        link.textContent = competition;
        link.addEventListener("click", function () {
            makeApiRequest(competition);
        });
        listItem.appendChild(link);
        let icon = document.createElement("i");
        icon.className = "fa fa-angle-right";
        listItem.appendChild(icon);
        competitionListElement.appendChild(listItem);
    }
}