function checkInplayStatus(openDate){
    const specifiedDate = new Date(openDate);
    const currentDate = new Date();
    return specifiedDate > currentDate;
}

async function getSoccerMatch(){
    const response = await fetch("http://localhost:7074/exuser/getsportid/1");
    const cricketmatches = await response.json();
    showSoccerMatch(cricketmatches);
  }
  
  function showSoccerMatch(cricketmatches){
    let content = document.getElementById("content");
    content.innerHTML = "";
    for (let i = 0; i < cricketmatches.length; i++) {
      let child = cricketmatches[i];
      let inplaystatus=checkInplayStatus(child.openDate);
      content.innerHTML += `<tr>
                                <th>
                                    <i class="fa fa-circle" aria-hidden="true"></i>
                                    <a href="">
                                        ${child.eventName}
                                        <span class="play">${inplaystatus? 'In-Play' : child.openDate}</span>
                                        <i class="fas fa-alarm-clock"></i>
                                        <span class="streamingIcon"></span>
                                    </a>
                                </th>
                                <td>
                                    <div class="col-div">
                                        <input type="button" value="1.25" class="blue">
                                        <input type="button" value="1.26" class="pink">
                                    </div>
                                </td>
                                <td>
                                    <div class="col-div">
                                        <input type="button" value="-" class="blue">
                                        <input type="button" value="-" class="pink">
                                    </div>
                                </td>
                                <td>
                                    <div class="col-div">
                                        <input type="button" value="1.23" class="blue">
                                        <input type="button" value="1.33" class="pink">
                                    </div>
                                </td>
                                <td>
                                    <i class="fas fa-thumbtack"></i>
                                </td>
                            </tr>`;
      }
  }
  
  getSoccerMatch();