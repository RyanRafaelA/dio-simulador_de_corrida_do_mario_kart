const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName.NOME} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult+attribute}`);
}

async function playRaceEngine(character1, character2){
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}ª`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block == "RETA"){
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;

            await logRollResult(character2, "velocidade", diceResult2, character2.VELOCIDADE);
            await logRollResult(character1, "velocidade", diceResult1, character1.VELOCIDADE);
        }
    
        if(block == "CURVA") {
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            
            await logRollResult(character2, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
            await logRollResult(character1, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
        } 
    
        if(block == "CONFRONTO") {
            let powerRsult2 = diceResult2 + character2.PODER;
            let powerRsult1 = diceResult1 + character1.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME} 🚨`);

            await logRollResult(character2, "poder", diceResult2, character2.PODER);
            await logRollResult(character1, "poder", diceResult1, character1.PODER);
        
            if(powerRsult1 > powerRsult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceuu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            }
            if(powerRsult2 > powerRsult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceuu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }
            console.log(powerRsult1 === powerRsult2 ? "Confronto emparado! Nenhum ponto foi perdido.": "")
        }

        //verificando um vencedor
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcouu um ponto!`);
            character1.PONTOS++;
        } else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto`);
            character2.PONTOS++;
        }
        console.log("########################################################");
    }
}

async function declareaWinner(character1, character2){
    console.log("Resultado Final");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    } else if(character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log("A corrida terminou em empate");
    }

}

(async function main(){
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playRaceEngine(player1, player2);
    await declareaWinner(player1, player2);
})()