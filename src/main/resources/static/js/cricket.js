async function getCricketMatch(){
  const response = await fetch("http://localhost:7074/exuser/getsportid/4");
  const cricketmatches = await response.json();
  showCricketMatch(cricketmatches);
}

function showCricketMatch(cricketmatches){
    console.log(cricketmatches);
}

getCricketMatch();