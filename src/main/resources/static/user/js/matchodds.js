function getSportId() {
    const currentUrl = window.location.pathname;
    const userid = currentUrl.split("/")[3];
    return userid;
}

function getEventId() {
    const currentUrl = window.location.pathname;
    const eventid = currentUrl.split("/")[4];
    return eventid;
}

async function getMatchOddsData(){
    const sportId=getSportId();
    const eventId = getEventId();
    const response = await fetch(`http://localhost:7074/exuser/getsportid/${sportId}/${eventId}`);
    const cricketmatches = await response.json();
    document.getElementById("competionField").innerHTML=cricketmatches[0].eventName;
    showBookmakerMarketData(cricketmatches[0].matchRunners);
}
getMatchOddsData();

function showMatchOddsData(data){
    let content = document.getElementById("content");
    content.innerHTML = "";
    const matchRunnersData=data.matchRunners;
    const runnersData=data.data[0].runners;
    for (let i = 0; i < matchRunnersData.length; i++) {
        const child=matchRunnersData[i];
        const runner = runnersData[i];
        if (runner && runner.ex) {
            content.innerHTML += `<tr>
                                  <th>
                                      <p><a><img class="icon-predict" src="/user/img/transparent.gif" /></a>${child.name}</p>
                                  </th>
                                  <td class="back-3">${runner.ex.availableToBack[2]?.price || '--'} <br/> <span>${runner.ex.availableToBack[2]?.size || '--'}</span></td>
                                  <td class="back-2">${runner.ex.availableToBack[1]?.price || '--'} <br/> <span>${runner.ex.availableToBack[1]?.size || '--'}</span></td>
                                  <td class="back-1">${runner.ex.availableToBack[0]?.price || '--'} <br/> <span>${runner.ex.availableToBack[0]?.size || '--'}</span></td>
                                  <td class="lay-1">${runner.ex.availableToLay[0]?.price || '--'} <br/> <span>${runner.ex.availableToLay[0]?.size || '--'}</span></td>
                                  <td class="lay-2">${runner.ex.availableToLay[1]?.price || '--'} <br/> <span>${runner.ex.availableToLay[1]?.size || '--'}</span></td>
                                  <td class="lay-3">${runner.ex.availableToLay[2]?.price || '--'} <br/> <span>${runner.ex.availableToLay[2]?.size || '--'}</span></td>
                                </tr>`;
          } else {
            content.innerHTML += `<tr>
                                  <th>
                                      <p><a><img class="icon-predict" src="/user/img/transparent.gif" /></a>${child.name}</p>
                                  </th>
                                  <td colspan="7">Data not available</td>
                                </tr>`;
          }
    }
}

function showBookmakerMarketData(data){
    let bookmakerContent = document.getElementById("bookmakerContent");
    bookmakerContent.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const child=data[i];
        bookmakerContent.innerHTML+=`<tr style="display: table-row;" class="bookmakerRow">
                                        <td>
                                            <p>${child.name}</p>
                                            <span id="withoutBetBook105668" style="" class="win">0</span>
                                        </td>
                                        <td colspan="3" class="back-gradient">
                                        <span class="suspendBookmaker">Suspend</span>
                                        </td>
                                        <td colspan="3" class="lay-gradient">
                                        </td>
                                    </tr>`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    oddssocket = io("https://data.betcair.in", { transports: ["websocket"] });
    oddssocket.on("connect", () => {
      console.log("Connection Established");
    });
    const eventId = getEventId();
    oddssocket.emit("Event/Auto", eventId);
    var SocketUrl = "Event/Auto" + "/" + eventId;
    oddssocket.on(SocketUrl, (result) => {
      var jsonData = result;
      showMatchOddsData(jsonData);
    });
  });

