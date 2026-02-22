let pecas;
let pretas;
let brancas;
let turno = true;
let turnoId = document.getElementById('turno');
let lanceContador = 1;
let lanceId = document.getElementById('lanceContador');

document.addEventListener('click', function(event){ //Seleção
    if(event.target.classList.contains('pecas')){
        if(event.target.classList.contains('B') && turno === true){
            pecas = event.target;
            pretas = document.querySelectorAll('.P');
            pretas.forEach(pretas => pretas.classList.add('semHitbox'));
        } else if(event.target.classList.contains('P') && turno === false){
            pecas = event.target;      
            brancas = document.querySelectorAll('.B');
            brancas.forEach(brancas => brancas.classList.add('semHitbox'));
        }
    }
});

document.addEventListener('click', function(event){ //Movimento e Captura
    if(event.target.className === 'quadradoB' || event.target.className === 'quadradoP'){
        if(!turno){
            if(pecas != undefined && PodeMover(pecas, pecas.parentElement.id, event.target)){
                event.target.innerHTML = "";
                event.target.appendChild(pecas);
                pecas = undefined;
                brancas.forEach(brancas => brancas.classList.remove('semHitbox'));
                console.log(brancas.classList);
                turnoId.innerHTML = 'Turno: Brancas';
                turno = true;
                lanceContador ++;
                lanceId.innerHTML = `Lance: ${lanceContador}`;
            }
        } else if(pecas != undefined && PodeMover(pecas, pecas.parentElement.id, event.target)){
                event.target.innerHTML = "";
                event.target.appendChild(pecas);
                pecas = undefined;
                pretas.forEach(pretas => pretas.classList.remove('semHitbox'));
                console.log(pretas.classList);
                turnoId.innerHTML = 'Turno: Pretas';
                turno = false;
        }
    }
});

function PodeMover(peca, partida,  destino){ //Condição de movimento
    const colunaP = Number(partida[0]);
    const linhaP = Number(partida[1]);
    const colunaD = Number(destino.id[0]);
    const linhaD = Number(destino.id[1]);
    SdisH = colunaD - colunaP;
    SdisV = linhaD - linhaP;
    disH = Math.abs(SdisH);
    disV = Math.abs(SdisV);
    DestNum = Number(destino.id);

    switch(peca.id[0]){
        case 'B':
            if(disH === disV){
                return true;
            }else{
                return false;
            }
        case 'T':
            if(disH === 0 || disV === 0){
                return true;
            }else{
                return false;
            }
        case 'D':
            if(disH === disV || disH === 0 || disV === 0){
                return true;
            }else{
                return false;
            }
        case 'R':
            if(disH === 1 && disV === 1 || disH === 1 && disV === 0 || disV === 1 && disH === 0){
                return true;
            } else{
                return false;
            }
        case 'C':
            if(disH === 1 && disV === 2 || disH === 2 && disV === 1){
                return true;
            } else{
                return false;  
            }
        case 'P':
            if(linhaP === 2 && disV === 2 && disH === 0 && peca.classList.contains('B') && destino.childElementCount === 0 && document.getElementById(String(DestNum - 1)).childElementCount === 0){
                return true;
            } else if(linhaP === 7 && disV === 2 && disH === 0 && peca.classList.contains('P') && destino.childElementCount === 0 && document.getElementById(String(DestNum + 1)).childElementCount === 0){
                return true;
            } else if(SdisV === -1 && disH === 0 && peca.classList.contains('P') && destino.childElementCount === 0){
                return true;
            } else if(SdisV === 1 && disH === 0 && peca.classList.contains('B') && destino.childElementCount === 0){
                return true;
            } else if(destino.childElementCount > 0 && disH === 1 && SdisV === 1 && peca.classList.contains('B')){
                return true;
            } else if(destino.childElementCount > 0 && disH === 1 && SdisV === -1 && peca.classList.contains('P')){
                return true;
            } else{
                return false;
            }
    }
}