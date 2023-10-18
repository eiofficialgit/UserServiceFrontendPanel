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
}

var matchRunnersData;

function showMatchOddsData(data){
    let content = document.getElementById("content");
    content.innerHTML = "";
    matchRunnersData=data.matchRunners;
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
    const runnersData=data.data[1].bm1.reverse();
    for (let i = 0; i < matchRunnersData?.length; i++) {
        const child=matchRunnersData[i];
        if (runnersData[i].s === "ACTIVE") {
            bookmakerContent.innerHTML += `<tr style="display: table-row;" class="bookmakerRow">
                                            <td style="width: 40%;">
                                                <p>${child.name}</p>
                                                <span id="withoutBetBook105668" style="" class="win">0</span>
                                            </td>
                                            <td colspan="3" class="back-gradient" style="width: 30%;">
                                                <dl>
                                                    <dd>${runnersData[i].b3}</dd>
                                                    <dd>${runnersData[i].b2}</dd>
                                                    <dd class="back1grad">${runnersData[i].b1}</dd>
                                                </dl>
                                            </td>
                                            <td colspan="3" class="lay-gradient" style="width: 30%;">
                                                <dl>
                                                    <dd class="lay1grad">${runnersData[i].l1}</dd>
                                                    <dd>${runnersData[i].l2}</dd>
                                                    <dd>${runnersData[i].l3}</dd>
                                                </dl>
                                            </td>
                                        </tr>`;
        } else {
            bookmakerContent.innerHTML +=`<tr style="display: table-row;" class="bookmakerRow">
                                            <td style="width: 40%;">
                                                <p>${child.name}</p>
                                                <span id="withoutBetBook105668" style="" class="win">0</span>
                                            </td>
                                            <td colspan="3" class="back-gradient" style="width: 30%; background-color: rgba(36,58,72,0.4);">
                                                <dl>
                                                    <dd></dd>
                                                    <dd></dd>
                                                    <dd class="back1grad"></dd>
                                                </dl>
                                                <span class="suspendBookmaker">Suspend</span>
                                            </td>
                                            <td colspan="3" class="lay-gradient" style="width: 30%; background-color: rgba(36,58,72,0.4);">
                                                <dl>
                                                    <dd class="lay1grad"></dd>
                                                    <dd></dd>
                                                    <dd></dd>
                                                </dl>
                                            </td>
                                        </tr>`;
        }
    }
}

function showFancyBetData(data){
    const fancyBetData=data.data;
    let fancyContent = document.getElementById("fancyContent");
    fancyContent.innerHTML = "";
    for (let i = 0; i < fancyBetData.length; i++) {
        const child=fancyBetData[i];
        if(child.gstatus === ""){
            fancyContent.innerHTML += `<tr style="display: table-row;" class="fancyRow">
                                            <th colspan="3">
                                                <dl class="fancy-th-layout">
                                                    <dt>
                                                        <p>${child.nat}</p>
                                                    </dt>
                                                </dl>
                                            </th>
                                            <td colspan="2" class="multi_select">
                                                <ul style="text-align: center;">
                                                    <li class="lay-1 fancylay1" id="lay_1">
                                                        <a id="runsInfo" style="cursor: pointer" ><strong id="fancylay1">${child.l1}</strong><span id="fancylaysize1">${child.ls1}</span></a>
                                                    </li>
                                                    <li class="back-1 fancyback1" id="back_1">
                                                        <a id="runsInfo" style="cursor: pointer"><strong id="fancyback1">${child.b1}</strong><span id="fancybacksize1">${child.bs1}</span></a>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td class="td-fancy_merge" colspan="2">
                                                <dl class="fancy-info">
                                                    <dt>Min/Max</dt>
                                                    <dd class="minMaxvalue">${child.min}/${child.max}</dd>
                                                </dl>
                                            </td>
                                        </tr>`;
        }
        else {
            fancyContent.innerHTML += `<tr style="display: table-row;">
                                            <th colspan="3">
                                                <dl class="fancy-th-layout">
                                                    <dt>
                                                        <p>${child.nat}</p>
                                                    </dt>
                                                </dl>
                                            </th>
                                            <td colspan="2" class="multi_select">
                                                <ul style="text-align: center;">
                                                    <li class="lay-1 fancylay1" id="lay_1">
                                                        <a id="runsInfo" style="cursor: pointer" ><strong id="fancylay1">0</strong><span id="fancylaysize1">0</span></a>
                                                    </li>
                                                    <li class="back-1 fancyback1" id="back_1">
                                                        <a id="runsInfo" style="cursor: pointer"><strong id="fancyback1">0</strong><span id="fancybacksize1">0</span></a>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td class="td-fancy_merge" colspan="2">
                                                <dl class="fancy-info">
                                                    <dt>Min/Max</dt>
                                                    <dd class="minMaxvalue">${child.min}/${child.max}</dd>
                                                </dl>
                                                <span class="suspendFancy">Suspend</span>
                                            </td>
                                        </tr>`;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getMatchOddsData();
    oddssocket = io("https://data.betcair.in", { transports: ["websocket"] });
    oddssocket.on("connect", () => {
      console.log("Connection Established");
    });
    const eventId = getEventId();

    oddssocket.emit("Event/Auto", eventId);
    oddssocket.emit("BookM/Auto", eventId);
    oddssocket.emit("Fancy/Auto", eventId);

    var matchOddsUrl = "Event/Auto" + "/" + eventId;
    oddssocket.on(matchOddsUrl, (result) => {
      var jsonData = result;
      showMatchOddsData(jsonData);
    });

    var bookmakerMarketUrl = "BookM/Auto" + "/" + eventId;
    oddssocket.on(bookmakerMarketUrl, (result) => {
        var jsonData = result;
       // Provider - Diamond
        showBookmakerMarketData(jsonData);
    });

    var fancyBetUrl = "Fancy/Auto" + "/" + eventId;
    oddssocket.on(fancyBetUrl, (result) => {
        var jsonData = result;
        showFancyBetData(jsonData);
    });

  });