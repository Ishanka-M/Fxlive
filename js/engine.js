const pairs=["EUR/USD","GBP/USD","USD/JPY","XAU/USD"];
const pairSel=document.getElementById("pair");
pairs.forEach(p=>{
    let o=document.createElement("option");
    o.value=p;o.innerText=p;
    pairSel.appendChild(o);
});
pairSel.value=pairs[0];

async function analyze(){

    const pair=pairSel.value;
    const tf=document.getElementById("tf").value;

    const data=await fetchOHLC(pair, tf);

    const structure=detectStructure(data);
    const wave=wavePhase(data);
    const volatility=atr(data);
    const score=confluence(structure,wave,volatility);

    let signal="WAIT";
    if(score>60 && structure==="bull") signal="BUY";
    if(score>60 && structure==="bear") signal="SELL";

    document.getElementById("signal").innerHTML=
        `<span class="badge ${signal.toLowerCase()}">${signal}</span>`;

    document.getElementById("score").innerHTML=
        `Score: ${score}%<br>
         Structure: ${structure}<br>
         Wave: ${wave}<br>
         ATR: ${volatility.toFixed(5)}`;

    const last=data[data.length-1].close;
    const projection= last + (structure==="bull"?volatility:-volatility)*3;

    document.getElementById("forecast").innerHTML=
        `Projected Target: ${projection.toFixed(5)}`;
}

analyze();
