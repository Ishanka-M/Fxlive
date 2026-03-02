const CACHE_TIME = 60000;

async function fetchOHLC(pair, tf){

    const key = `${pair}_${tf}`;
    const cached = localStorage.getItem(key);

    if(cached){
        const obj = JSON.parse(cached);
        if(Date.now() - obj.time < CACHE_TIME){
            return obj.data;
        }
    }

    try{
        const symbol = pair.replace("/","").toLowerCase();
        const baseUrl = `https://stooq.com/q/d/l/?s=${symbol}&i=${tf}`;
        const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`;

        const res = await fetch(proxy);
        const text = await res.text();

        const rows = text.split("\n").slice(1,-1);

        const data = rows.map(r=>{
            const p=r.split(",");
            return {
                open:parseFloat(p[1]),
                high:parseFloat(p[2]),
                low:parseFloat(p[3]),
                close:parseFloat(p[4])
            }
        });

        localStorage.setItem(key, JSON.stringify({time:Date.now(), data}));
        return data;

    }catch(e){

        console.log("API Failed – Using Demo Data");

        return generateDemoData();
    }
}

function generateDemoData(){
    let data=[];
    let price=1.1000;
    for(let i=0;i<100;i++){
        const change=(Math.random()-0.5)*0.002;
        price+=change;
        data.push({
            open:price,
            high:price+0.001,
            low:price-0.001,
            close:price
        });
    }
    return data;
}
