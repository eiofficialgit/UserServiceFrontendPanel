document.addEventListener("DOMContentLoaded", function () {
    var firstRunnerData;
    var secondRunnerData;
    var oddssocket;
    var eventId = getEventId(); 
  
    oddssocket = io("https://data.betcair.in", { transports: ["websocket"] });
    oddssocket.on("connect", () => {
      console.log("Connection Established");
    });
  
    var firstRunnerRow = document.querySelector("#firstRunnerRow");
    var secondRunnerRow = document.querySelector("#secondRunnerRow");
    var SocketUrl = "Event/Auto/" + eventId;
    oddssocket.emit("Event/Auto", eventId);
  
    oddssocket.on(SocketUrl, (result) => {
      var jsonData = result;
      firstRunnerData = jsonData.data[0].runners[0];
      secondRunnerData = jsonData.data[0].runners[1];
      updateRow(firstRunnerRow, firstRunnerData.ex);
      updateRow(secondRunnerRow, secondRunnerData.ex);
    });
  
    function updateRow(row, data) {
      var backData = data.availableToBack;
      var layData = data.availableToLay;
  
      for (var i = 0; i < 3; i++) {
        var cell = row.cells[i + 1];
        if (i < backData.length) {
          cell.innerHTML = backData[i].price + "<br>" + backData[i].size;
        } else {
          cell.textContent = "-";
        }
      }
  
      for (var i = 0; i < 3; i++) {
        var cell = row.cells[i + 4];
        if (i < layData.length) {
          cell.innerHTML = layData[i].price + "<br>" + layData[i].size;
        } else {
          cell.textContent = "-";
        }
      }
    }
  });
  





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
    showMatchOddsData(cricketmatches[0].matchRunners);
    showBookmakerMarketData(cricketmatches[0].matchRunners);
}
getMatchOddsData();

function showMatchOddsData(data){
    let content = document.getElementById("content");
    content.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const child=data[i];
        content.innerHTML+=`<tr>
                                <th>
                                    <p><a><img class="icon-predict" src="/user/img/transparent.gif" /></a>${child.name}</p>
                                </th>
                                <td class="back-3 back3105668"
                                </td>
                                <td class="back-2 back2105668"
                                </td>
                                <td class="back-1 back1105668"
                                </td>
                                <td class="lay-1 lay1105668"
                                </td>
                                <td class="lay-2 lay2105668"
                                </td>
                                <td class="lay-3 lay3105668"
                                </td>
                            </tr>`;
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

