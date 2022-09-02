// Area reserved for skills (so i wouldn't spam index.js)

const { MessageFlags } = require("discord.js")
const { write } = require("lowdb/adapters/FileSync")

/* Basically, i have the skill name for the person to type and he can choose a character to use the skill against. I always check Esquiva (Dodge) and Acerto (Precision)
to know if the skill will hit, and then i want to know about attack x defense.
if(dado_dano = 20) is my way of replicating critical strikes, where i just double the dice.
Skills have different rolls of dices and effects. One example is 'Preciso (Bullseye)', where if he hits the person with a result of 4 or plus, he will do extra damage.
Skills will also always spend MP, that's 'mp_gasta (spent_mp)'.
*/

/* Not all of those skills are 100% done without any mistakes or programmed on the most time-effective way.
*/

module.exports = {
all:(rpgBot, db)=>{

this.all

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]

if(inicio_comando == "PAGAR"){

      let nome_personagem = msg.content.split(" ")
      nome_personagem = nome_personagem.splice(1, 5)
      nome_personagem = nome_personagem.join(" ")
      nome_personagem = parseInt(nome_personagem)
    
      let id_member = msg.member.id
      let char = personagem_logado(id_member)
    
      char.Dinheiro -= nome_personagem
      db.write()
    
      msg.reply(`${char.nome} gastou €$ **${nome_personagem}** de **${char.Dinheiro}**.`)
      msg.delete()
}
if(inicio_comando == "GANHAR"){
    
      let nome_personagem = msg.content.split(" ")
      nome_personagem = nome_personagem.splice(1, 5)
      nome_personagem = nome_personagem.join(" ")
      nome_personagem = parseInt(nome_personagem)
    
      let id_member = msg.member.id
      let char = personagem_logado(id_member)
    
      char.Dinheiro += nome_personagem
      db.write()
    
      msg.reply(`${char.nome} ganhou €$ **${nome_personagem}** de **${char.Dinheiro}**.`)
      msg.delete()
}
if(inicio_comando == "D100"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let dado = rollDice100()

  msg.reply(`rolou os dados e tirou **${dado}**!`)
}
if(inicio_comando == "D"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let atacante = personagem_logado(id_member)
  let dado = rollDice20()
  let vigor = atacante.Vig + dado
  let reflexo = atacante.Ref + dado
  let destreza = atacante.Des + dado
  let intelecto = atacante.Int + dado
  let carisma = atacante.Car + dado
  let vontade = atacante.Von + dado

  msg.reply(`rolou os dados e tirou **${dado}**!`)
  
  if (dado <= 1){
    msg.reply(`**Erro Crítico**.. aimds`)
  }

  if(dado >= 20){
    msg.reply(`**Acerto Crítico!**`)
  }

  if(nome_personagem == "Vig"){
  msg.reply(`Vigor: ${dado} + ${atacante.Vig} = **${vigor}**`)
  }

  if(nome_personagem == "Ref"){
  msg.reply(`Reflexos: ${dado} + ${atacante.Ref} = **${reflexo}**`)
  }

  if(nome_personagem == "Des"){
  msg.reply(`Destreza: ${dado} + ${atacante.Des} = **${destreza}**`)
  }

  if(nome_personagem == "Int"){
  msg.reply(`Intelecto: ${dado} + ${atacante.Int} = **${intelecto}**`)
  }

  if(nome_personagem == "Car"){
  msg.reply(`Carisma: ${dado} + ${atacante.Car} = **${carisma}**`)
  }

  if(nome_personagem == "Von"){
  msg.reply(`Vontade: ${dado} + ${atacante.Fri} = ${vontade}`)
  }

  if(nome_personagem == "9"){
  dado = rollDice9()
  msg.reply(`${dado}`)
  }
}
if(inicio_comando == "RANDOM"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let dado = rollDice1d8()

  msg.reply(`rolou os dados e tirou **${dado}**!`)
  
  if (dado == 1){
    msg.reply(`A Sorte escolheu **Kachiro**`)
  }

  if(dado == 2){
    msg.reply(`A Sorte escolheu **Papaco**`)
  }

  if(dado == 3){
    msg.reply(`A Sorte escolheu **VelhoLeo**`)
  }

  if(dado == 4){
    msg.reply(`A Sorte escolheu **Jao**`)
  }

  if(dado == 5){
    msg.reply(`A Sorte escolheu **Clicker**`)
  }

  if(dado == 6){
    msg.reply(`A Sorte escolheu **Ete**`)
  }

  if(dado == 7){
    msg.reply(`A Sorte escolheu **HalenJames**`)
  }

  if(dado == 8){
    msg.reply(`A Sorte escolheu **KaeruLeo**`)
  }

}
if(inicio_comando == "UP"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let atacante = personagem_logado(id_member)

  if(nome_personagem == "Vig+1"){
  atacante.Vig += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Ref+1"){
  atacante.Ref += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Des+1"){
  atacante.Des += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Int+1"){
  atacante.Int += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Car+1"){
  atacante.Car += 1
  msg.reply(`Upou`)
  msg.delete()
  }

  if(nome_personagem == "Von+1"){
  atacante.Von += 1
  msg.reply(`Upou`)
  msg.delete()
  }
}
if(inicio_comando == "DESUP"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let atacante = personagem_logado(id_member)

  if(nome_personagem == "Vig-1"){
    atacante.Vig -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }
  
    if(nome_personagem == "Ref-1"){
    atacante.Ref -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }
  
    if(nome_personagem == "Des-1"){
    atacante.Des -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }
  
    if(nome_personagem == "Int-1"){
    atacante.Int -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }
  
    if(nome_personagem == "Car-1"){
    atacante.Car -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }
  
    if(nome_personagem == "Von-1"){
    atacante.Von -= 1
    msg.reply(`Desupou`)
    msg.delete()
    }
}
if(inicio_comando == "FUR"){

// vai encontrar ou se esconder do personagem, serve pros dois ja q eh so 1 dado

    let nome_personagem = msg.content.split(" ")
    nome_personagem = nome_personagem.splice(1, 5)
    nome_personagem = nome_personagem.join(" ")

    let defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
    let id_member = msg.member.id
    let atacante = personagem_logado(id_member)
    let dado_fur = rollDice20()
    let dado_per = rollDice20()
    let ModsPer = 0 + defensor.FurTecnica
    let ModsFur = 0 + atacante.FurTecnica
    let furtividade = atacante.Fur + ModsFur + dado_fur - defensor.Fur - ModsPer - dado_per

    if(defensor.Arena == "Nevoa"){
    ModsPer -= 2
    }

    if(defensor.Tatico == "S"){
    furtividade -= 4
    }

if(dado_fur >= 20){
furtividade += 100
msg.reply(`**Crit**!`)
}

if(dado_per >= 20){
furtividade -= 100
msg.reply(`**Crit**!`)
}

    if(furtividade > 0 ){
    atacante.Furtivo = "S"
    msg.reply(`**${atacante.Nome}** conseguiu ficar **Furtivo** contra **${defensor.Nome}**. 
    
    Furtividade: ${atacante.Fur} + **${dado_fur}** Vs. **${dado_per}** + ${defensor.Fur}`)
    msg.delete()
    }
    else{
    atacante.Furtivo = "N"
    let custo = 0 + atacante.MP_Ativacao
    atacante.MP -= custo
    atacante.HP -= atacante.HP_Ativacao
    msg.reply(`**${defensor.nome}** percebeu **${atacante.nome}**.
    
    Percepção: ${defensor.Fur} + **${dado_per}** Vs. **${dado_fur}** + ${atacante.Fur}`)
    msg.delete()
    }

    db.write()
}
if(inicio_comando == "ATKFUR"){

// vai encontrar ou se esconder do personagem, serve pros dois ja q eh so 1 dado

    let nome_personagem = msg.content.split(" ")
    nome_personagem = nome_personagem.splice(1, 5)
    nome_personagem = nome_personagem.join(" ")

    let defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
    let id_member = msg.member.id
    let atacante = personagem_logado(id_member)
    let dado_fur = rollDice20()
    let dado_per = rollDice20()
    let ModsPer = 0 + defensor.FurTecnica
    let ModsFur = 0 + atacante.FurTecnica
    let furtividade = atacante.Fur + ModsFur + dado_fur - defensor.Fur - ModsPer - dado_per

    if(defensor.Arena == "Nevoa"){
    ModsPer -= 2
    }

    if(defensor.Tatico == "S"){
    furtividade -= 4
    }

if(dado_fur >= 20){
furtividade += 100
msg.reply(`**Crit**!`)
}

if(dado_per >= 20){
furtividade -= 100
msg.reply(`**Crit**!`)
}

    if(furtividade > 0 ){
    atacante.AtkFurtivo = "S"
    msg.reply(`**${atacante.Nome}** conseguiu ficar **Furtivo** contra **${defensor.Nome}**. 
    
    Furtividade: ${atacante.Fur} + **${dado_fur}** Vs. **${dado_per}** + ${defensor.Fur}`)
    msg.delete()
    }
    else{
    atacante.AtkFurtivo = "N"
    let custo = 0 + atacante.MP_Ativacao
    atacante.MP -= custo
    atacante.HP -= atacante.HP_Ativacao
    msg.reply(`**${defensor.nome}** percebeu **${atacante.nome}**.
    
    Percepção: ${defensor.Fur} + **${dado_per}** Vs. **${dado_fur}** + ${atacante.Fur}`)
    msg.delete()
    }

    db.write()
}
if(inicio_comando == "PER"){

  // vai encontrar ou se esconder do personagem, serve pros dois ja q eh so 1 dado
  
      let nome_personagem = msg.content.split(" ")
      nome_personagem = nome_personagem.splice(1, 5)
      nome_personagem = nome_personagem.join(" ")
  
      let defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
      let id_member = msg.member.id
      let atacante = personagem_logado(id_member)
      let ModsPer = 0 + defensor.FurTecnica
      let ModsFur = 0 + atacante.FurTecnica
      let dado_fur = rollDice20()
      let dado_per = rollDice20()
      let percepcao = atacante.Fur + ModsPer + dado_per - defensor.Fur - ModsFur - dado_fur

if(defensor.Arena == "Nevoa" || atacante.Arena == "Nevoa"){
percepcao -= 2
}

if(atacante.Tatico == "S"){
percepcao += 4
}

if(dado_fur >= 20){
percepcao -= 100
msg.reply(`**Crit**!`)
}

if(dado_per >= 20){
percepcao += 100
msg.reply(`**Crit**!`)
}
    
if(percepcao >= 0 ){
      defensor.Furtivo = "N"
      defensor.AtkFurtivo = "N"
      defensor.Disfarce = "N"
msg.reply(`**${atacante.Nome}** percebeu **${defensor.Nome}**.
      
Percepção: ${atacante.Fur} + **${dado_per}** Vs. **${dado_fur}** + ${defensor.Fur}`)
msg.delete()
}
else{
msg.reply(`**${defensor.Nome}** conseguiu continuar furtivo contra **${atacante.Nome}**. 
      
Furtividade: ${defensor.Fur} + **${dado_fur}** Vs. **${dado_per}** + ${atacante.Fur}`)
msg.delete()
}

// talvez no futuro fazer q if disfarce == s, tem uma margem onde tu pd perceber falsamente

db.write()
}
// Agarrar
if(inicio_comando == "RES"){

  // vai encontrar ou se esconder do personagem, serve pros dois ja q eh so 1 dado
  
  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let atacante = personagem_logado(id_member)

  let dado_res = rollDice20()
  let dado_controle = rollDice20()

  let resistencia = atacante.TE
  let controle = atacante.ControleCondicao

  let condicaoanterior = atacante.Condicao

  let resistir = (resistencia + dado_res) - (controle + dado_controle)

  if(resistir > 0){
  msg.reply(`**${atacante.Nome}** resistiu á **${condicaoanterior}**.`)
  atacante.Condicao = "N"
  }
  if(resistir < 0){
  msg.reply(`**${atacante.Nome}** não resistiu á **${condicaoanterior}**.`)}

atacante.ControleCondicao -= 3

db.write()

}
if(inicio_comando == "INI"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
  let id_member = msg.member.id
  let atacante = personagem_logado(id_member)
  let dado_iniatk = rollDice20()
  let dado_inidef = rollDice20()
  let iniciativa = atacante.Ini + dado_iniatk - defensor.Ini - dado_inidef

  if(iniciativa < 0 ){

  msg.reply(`a Iniciativa foi jogada e ${defensor.Nome} ganhou.
  
  Iniciativa do ${atacante.Nome}: ${atacante.Ini} + **${dado_iniatk}**
  
  Iniciativa do ${defensor.Nome}: ${defensor.Ini} + **${dado_inidef}**`)}
  else{
  msg.reply(`a Iniciativa foi jogada e ${atacante.Nome} ganhou.
  
  Iniciativa do ${atacante.Nome}: ${atacante.Ini} + **${dado_iniatk}**
  
  Iniciativa do ${defensor.Nome}: ${defensor.Ini} + **${dado_inidef}**`)
  }
}
if(inicio_comando == "FOTO"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let char = personagem_logado(id_member)

  char.Foto = nome_personagem
  db.write()
}
if(inicio_comando == "CURA"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let char = db.get("usuarios").find({Nome : nome_personagem}).value()

  char.MP = char.Max_MP
  char.HP = char.Max_HP
  db.write()
  
/*  char.mp += 10
  char.CocaCola -= 1
  db.write() */

  msg.reply(`**${char.Nome}** curadinho ^^`)
}
if(inicio_comando == "EQUIP"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let char = personagem_logado(id_member)

  // Armas

  if(nome_personagem == "Adaga"){
  char.Manuseio += 2
  char.Leveza += 1
  char.Arma = "Adaga"
  db.write()

  msg.reply(`**${char.Nome}** equipou **Adaga**.`)
  }

if(nome_personagem == "Espada Longa"){
char.Peso += 1
char.Tamanho += 2
char.Fio += 3
char.Arma = "Espada Longa"
db.write()

msg.reply(`**${char.Nome}** equipou **Espada Longa**.`)
}

if(nome_personagem == "Espada Bastarda"){
char.Peso += 1
char.Tamanho += 2
char.Manuseio += 1
char.Fio += 2
char.Arma = "Espada Bastarda"
db.write()

msg.reply(`**${char.Nome}** equipou **Espada Bastarda**.`)
}

if(nome_personagem == "Lady Forlorn"){
char.Peso += 1
char.Manuseio += 2
char.Tamanho += 2
char.Fio += 5
char.Arma = "Lady Forlorn"
db.write()

msg.reply(`**${char.Nome}** equipou **Lady Forlorn**.`)
}

if(nome_personagem == "Dark Sister"){
char.Peso += 1
char.Manuseio += 3
char.Tamanho += 2
char.Fio += 4
char.Arma = "Dark Sister"
db.write()

msg.reply(`**${char.Nome}** equipou **Dark Sister**.`)
}

// Armaduras

if(nome_personagem == "Roupas Comuns"){
char.Manuseio += 1
char.Armadura = "Roupas Comuns"
db.write()

msg.reply(`**${char.Nome}** equipou **Roupas Comuns**.`)
}

if(nome_personagem == "Armadura Acolchoada"){
char.Protecao += 1
char.Armadura = "Armadura Acolchoada"
db.write()

msg.reply(`**${char.Nome}** equipou **Armadura Acolchoada**.`)
}

if(nome_personagem == "Couro Fervido"){
char.Peso += 1
char.Protecao += 2
char.Manuseio += 1
char.Armadura = "Couro Fervido"
db.write()

msg.reply(`**${char.Nome}** equipou **Couro Fervido**.`)
}

if(nome_personagem == "Cota de Malha"){
char.Peso += 1
char.Protecao += 3
char.Armadura = "Cota de Malha"
db.write()

msg.reply(`**${char.Nome}** equipou **Cota de Malha**.`)
}


if(nome_personagem == "Placa PeitoMalha"){
char.Peso += 3
char.Protecao += 5
char.Armadura = "Placa de Peito e Malha"
db.write()

msg.reply(`**${char.Nome}** equipou **Placa de Peito e Malha**.`)
}

}
if(inicio_comando == "DEQUIP"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let char = personagem_logado(id_member)
  
  // Armas

if(nome_personagem == "Adaga"){
char.Manuseio -= 2
char.Leveza -= 1
char.Arma = "Adaga"
db.write()

msg.reply(`**${char.Nome}** desequipou **Adaga**.`)
}

if(nome_personagem == "Espada Longa"){
char.Peso -= 1
char.Tamanho -= 2
char.Fio -= 3
char.Arma = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Espada Longa**.`)
}

if(nome_personagem == "Espada Bastarda"){
char.Peso -= 1
char.Tamanho -= 2
char.Manuseio -= 1
char.Fio -= 2
char.Arma = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Espada Bastarda**.`)
}

if(nome_personagem == "Lady Forlorn"){
char.Peso -= 1
char.Manuseio -= 2
char.Tamanho -= 2
char.Fio -= 5
char.Arma = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Lady Forlorn**.`)
}

if(nome_personagem == "Dark Sister"){
char.Peso += 1
char.Manuseio += 3
char.Tamanho += 2
char.Fio += 4
char.Arma = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Dark Sister**.`)
}

// Armaduras

if(nome_personagem == "Roupas Comuns"){
char.Manuseio -= 1
char.Armadura = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Roupas Comuns**.`)
}

if(nome_personagem == "Armadura Acolchoada"){
char.Protecao -= 1
char.Armadura = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Armadura Acolchoada**.`)
}

if(nome_personagem == "Couro Fervido"){
char.Peso -= 1
char.Protecao -= 2
char.Manuseio -= 1
char.Armadura = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Couro Fervido**.`)
}

if(nome_personagem == "Placa PeitoMalha"){
char.Peso -= 3
char.Protecao -= 5
char.Armadura = "N"
db.write()

msg.reply(`**${char.Nome}** desequipou **Placa de Peito e Malha**.`)
}
  
}
if(inicio_comando == "APROX"){

  // vai encontrar ou se esconder do personagem, serve pros dois ja q eh so 1 dado
  
      let nome_personagem = msg.content.split(" ")
      nome_personagem = nome_personagem.splice(1, 5)
      nome_personagem = nome_personagem.join(" ")
  
      let defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
      let id_member = msg.member.id
      let atacante = personagem_logado(id_member)
      let dado_aproximar = rollDice20()
      let dado_manterdistancia = rollDice20()
      let aproximaçao = atacante.Ini + dado_aproximar - defensor.Ini - dado_manterdistancia
    
      if(aproximaçao >= 0 ){
        atacante.Dist = "Curta"
        db.write()
        msg.reply(`**${atacante.Nome}** teve um resultado de **${aproximaçao}** e conseguiu correr de **${defensor.Nome}**. 
        
        Movimentação: ${atacante.Ini} + **${dado_aproximar}** Vs. **${dado_manterdistancia}** + ${defensor.Ini}`)
        msg.delete()
        }
        else{
        msg.reply(`**${defensor.Nome}** manteve a distância contra **${atacante.Nome}**.
        
        Movimentação: ${defensor.Ini} + **${dado_Ini}** Vs. **${dado_Ini}** + ${atacante.Ini} `)
        msg.delete()
        }
}
if(inicio_comando == "AFAST"){
  
      let nome_personagem = msg.content.split(" ")
      nome_personagem = nome_personagem.splice(1, 5)
      nome_personagem = nome_personagem.join(" ")
  
      let defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
      let id_member = msg.member.id
      let atacante = personagem_logado(id_member)
      let dado_fuga = rollDice20()
      let dado_manterdistancia = rollDice20()
      let afastar = atacante.Ini + dado_fuga - defensor.Ini - dado_manterdistancia
    
      if(afastar >= 0 && atacante.Dist == "Longa")
      msg.reply(`**${atacante.Nome}** correu pra **Fora de Alcance**!`)

      if(afastar >= 0 ){
      atacante.Dist = "Longa"
      db.write()
      msg.reply(`**${atacante.Nome}** teve um resultado de **${afastar}** e conseguiu correr de **${defensor.Nome}**. 
      
      Movimentação: ${atacante.Ini} + **${dado_fuga}** Vs. **${dado_manterdistancia}** + ${defensor.Ini}`)
      msg.delete()
      }
      else{
      msg.reply(`**${defensor.Nome}** manteve a distância contra **${atacante.Nome}**.
      
      Movimentação: ${defensor.Ini} + **${dado_manterdistancia}** Vs. **${dado_fuga}** + ${atacante.Ini} `)
      msg.delete()
      }
}
if(inicio_comando == "DIST"){

  // muda sua dist na hr
 
    let nome_personagem = msg.content.split(" ")
    nome_personagem = nome_personagem.splice(1, 5)
    nome_personagem = nome_personagem.join(" ")
  
    let id_member = msg.member.id
    let char = personagem_logado(id_member)

    if(nome_personagem == "Curta"){
      char.Dist = "Curta"
      db.write()
    }

    if(nome_personagem == "Longa"){
      char.Dist = "Longa"
      db.write()
    }

    if(nome_personagem == "FDV"){
// Fora de Visão
      char.Dist = "FDV"
      db.write()
    }
}
if(inicio_comando == "SET"){

// Escolher ~ resetar o talento pra condição usável
 
    let nome_personagem = msg.content.split(" ")
    nome_personagem = nome_personagem.splice(1, 5)
    nome_personagem = nome_personagem.join(" ")
  
    let id_member = msg.member.id
    let char = personagem_logado(id_member)

    if(nome_personagem == "Esquivador"){
    char.Esquivador = "S"
    }

    if(nome_personagem == "VontadeShinobi"){
    char.VontadeShinobi = "S"
    }

    db.write()

}
// Terrenos
if(inicio_comando == "VALE"){

  let nome_personagem = msg.content.split(" ")
  nome_personagem = nome_personagem.splice(1, 5)
  nome_personagem = nome_personagem.join(" ")

  let id_member = msg.member.id
  let char = personagem_logado(id_member)

char.HP += 100
char.FD -= 5
char.Terreno = "Vale do Fim"

// O -F.D não precisa reatribuir pq eu to sempre resetando a ficha msm. O motivo é pro duelo poder sempre acabar tb; mt HP pra durar, mas ter um fim

db.write()
}
// Cmds Basicos
if(inicio_comando == "TACKLE"){

let nome_personagem = msg.content.split(" ")
nome_personagem = nome_personagem.splice(1, 5)
nome_personagem = nome_personagem.join(" ")

let defensor = db.get("usuarios").find({Nome : nome_personagem}).value()
let id_member = msg.member.id
let atacante = personagem_logado(id_member)
let dado_dano = rollDice20()
let dado_def = rollDice20()
let dado_esquiva = rollDice20()
let dado_acerto = rollDice20()
let dado_velocidade = rollDice20()
let dado_iniciativa = rollDice20()
let dano = 0
let defesa = 0
let esquiva = 0
let acerto = 0
let iniciativa = 0
let velocidade = 0
let SucessoAcerto = 0
let DanoAcerto = 0
let TesteEsquiva = 0
let TesteVelocidade = 0
let DanoAtaque = 0
let DanoCausado = 0

if(atacante.Estilo == "Duas Maos"){
dano += 2
}

if(defensor.Estilo == "Duas Maos"){
defesa += 2
}

if(atacante.Estilo == "Duas Armas"){
velocidade += 2
}

if(defensor.Estilo == "Mao Livre"){
esquiva += 1
iniciativa += 1
}

if(atacante.Estilo == "Escudo"){
dano -= 2
}

if(defensor.Estilo == "Escudo"){
defesa += 2
}

if(atacante.FavGuerreiro == "S"){
dano += 1
acerto += 1
velocidade += 1
}

if(defensor.FavGuerreiro == "S"){
defesa += 1
esquiva += 1
iniciativa += 1
}

if(atacante.Ataque == "Forte"){
dano += 4
velocidade -= 4
}

if(defensor.Estilo == "Arco"){
defesa -= defensor.Vig*1
}

if(defensor.Defesa == "Guarda Alta"){
defesa += 5
}

if(atacante.Defesa == "Guarda Mista"){
dano += 2
}

if(defensor.Defesa == "Guarda Mista"){
defesa += 2
}

if(atacante.Defesa == "Guarda Baixa"){
dano += 3
acerto += 1
}

if(defensor.Defesa == "Guarda Baixa"){
defesa -= 2
}

if(defensor.Defesa == "Jogo de Pes"){
esquiva += 1
}

if(atacante.Defesa == "Evitar Contato"){
acerto -= 1
}

if(defensor.Defesa == "Evitar Contato"){
esquiva += 3
defesa -= 3
}

defesa += defensor.FD + dado_def + defensor.Protecao*3

dano += atacante.Tamanho*1 + atacante.Fio*2 + atacante.FA + dado_dano

acerto += atacante.AC + atacante.Manuseio + dado_acerto + atacante.ACTemp - Math.ceil(atacante.Peso*0.5)

esquiva += defensor.ES + defensor.Leveza + dado_esquiva + defensor.ESTemp

iniciativa += defensor.Ini + dado_iniciativa - defensor.Peso

velocidade += atacante.Vel + dado_velocidade - atacante.Tamanho

TesteEsquiva = esquiva - acerto

TesteVelocidade = velocidade - iniciativa

SucessoAcerto += acerto - esquiva

DanoAcerto = Math.pow(SucessoAcerto, 2)
DanoAcerto = Math.ceil(DanoAcerto*0.25)

if(dado_dano == 20){
DanoAtaque += 20
msg.reply(`**Acerto Crítico** no Ataque!`)
}

if(dado_def == 20){
DanoAtaque -= 20
msg.reply(`**Acerto Crítico** na Defesa!`)
}

if(atacante.Ataque == "Leve"){
velocidade += 2
acerto += 1
DanoAcerto -= SucessoAcerto
}

if(atacante.Ataque == "Preciso"){
dano -= 3
velocidade -= 2
DanoAcerto += Math.ceil(SucessoAcerto*1.5)
}

if(atacante.Estilo == "Arco"){
dano -= atacante.Vig*1
DanoAcerto += Math.ceil(SucessoAcerto*5)
}

if(SucessoAcerto < 0){
DanoAcerto = 0
SucessoAcerto = 0
}

DanoAtaque += dano - defesa

DanoCausado += DanoAcerto + dano - defesa

// Desse jeito, eu posso ler o dano que vai ser causado separado do modificador de dano inicial e de defesa (então qnd o dano causado é 0, eu ainda sei qual era o dano e defesa iniciais)

/* if(TesteEsquiva >= 0){
dado_def = 0
dado_dano = 0
dado_critico = 0
esquiva = 1
} */

if(DanoCausado < 0){
DanoCausado = 0
}

if(DanoAtaque < 0){
DanoAtaque = 0
}

if(TesteEsquiva < 0 ){
defensor.HP -= DanoCausado

db.write()
  
msg.reply(`atacou **${defensor.Nome}**.

**${atacante.Nome}** causou **${DanoAcerto}** de Dano pelo *Sucesso de Acerto* **(${SucessoAcerto})** e **${DanoAtaque}** pelo *Sucesso de Ataque*.

**${defensor.Nome}** tomou **${DanoCausado}** de Dano e ficou com **${defensor.HP}** de HP.
  
*Acerto: ${acerto - dado_acerto}* + **${dado_acerto}** Vs. **${dado_esquiva}** + *${esquiva - dado_esquiva}*

*Ataque: ${dano - dado_dano}* + **${dado_dano}** Vs. **${dado_def}** + *${defesa - dado_def}*`)

if(TesteVelocidade > 0){
msg.reply(`**${atacante.Nome}** foi mais veloz que **${defensor.Nome}** e pode atacar de novo.

*Velocidade: ${velocidade - dado_velocidade}* + **${dado_velocidade}** x. **${dado_iniciativa}** + *${atacante.DifVel} + ${iniciativa - dado_iniciativa}*`)
atacante.DifVel += 2
}
if(TesteVelocidade <= 0){
msg.reply(`**${defensor.Nome}** interrompeu **${defensor.Nome}** e tomou sua vez.

*Iniciativa: ${iniciativa - dado_iniciativa}* + **${dado_iniciativa}** x. **${dado_velocidade}** - *${atacante.DifVel} + ${velocidade - dado_velocidade}*`)
atacante.DifVel = 0
}}
else {
atacante.DifVel = 0
msg.reply(`${defensor.Nome} esquivou.
      
*Esquiva: ${esquiva - dado_esquiva}* + **${dado_esquiva}** Vs. **${dado_acerto}** + *${acerto - dado_acerto}*`)
}
  
if(defensor.HP <= 0){
  defensor.HP = 0
  db.write()
  msg.reply(`**${defensor.Nome}** desmaiou.`, {
files: [
'./pics/kill.gif'
]
})
  msg.delete()
}

db.write()

}
if(inicio_comando == "MOVE1"){

let nome_personagem = msg.content.split(" ")
nome_personagem = nome_personagem.splice(1, 5)
nome_personagem = nome_personagem.join(" ")
   
let id_member = msg.member.id
let char = personagem_logado(id_member)
    
char.Move1 = nome_personagem
db.write()
    
msg.reply(`inserirnomemaistarde aprendeu **${nome_personagem}**.`)
msg.delete()
}
if(inicio_comando == "INICIAL"){
let nome_personagem = msg.content.split(" ")
nome_personagem = nome_personagem.splice(1, 5)
nome_personagem = nome_personagem.join(" ")

let char = db.get("usuarios").find({Evento : "Inicial" }).value()

let id_member = msg.member.id
let Treinador = personagem_logado(id_member)

let Nature = rollDice21()

let NomeInicial = "."
let FindDex = "."

let HPIV = 14
let MPIV = 7
let SpeIV = 7
let AtkIV = 7
let DefIV = 7
let SpAtkIV = 7
let SpDefIV = 7

let Inicio = rollDice2()

let RollTraits = rollDice3()

if(RollTraits == 1){
let TraitsUm = rollDice1d8()

char.Trait2 = "-"
char.Trait3 = "-"

if(TraitsUm == 1){
char.Trait1 = "Arrogante"
}

if(TraitsUm == 2){
char.Trait1 = "Brincalhao"
}

if(TraitsUm == 3){
char.Trait1 = "Esnobe"
}

if(TraitsUm == 4){
char.Trait1 = "Excentrico"
}

if(TraitsUm == 5){
char.Trait1 = "Serio"
}

if(TraitsUm == 6){
char.Trait1 = "Orgulhoso"
}

if(TraitsUm == 7){
char.Trait1 = "Heroico"
}

if(TraitsUm == 8){
char.Trait1 = "Teimoso"
}
}

if(RollTraits == 2){
let TraitsUm = rollDice1d8()

char.Trait3 = "-"

if(TraitsUm == 1){
char.Trait1 = "Arrogante"
}

if(TraitsUm == 2){
char.Trait1 = "Brincalhao"
}

if(TraitsUm == 3){
char.Trait1 = "Esnobe"
}

if(TraitsUm == 4){
char.Trait1 = "Excentrico"
}

if(TraitsUm == 5){
char.Trait1 = "Serio"
}

if(TraitsUm == 6){
char.Trait1 = "Orgulhoso"
}

if(TraitsUm == 7){
char.Trait1 = "Heroico"
}

if(TraitsUm == 8){
char.Trait1 = "Teimoso"
}

let TraitsDois = rollDice1d8()

if(TraitsDois == 1){
char.Trait2 = "Audaz"
}

if(TraitsDois == 2){
char.Trait2 = "Bruto"
}

if(TraitsDois == 3){
char.Trait2 = "Covarde"
}

if(TraitsDois == 4){
char.Trait2 = "Docil"
}

if(TraitsDois == 5){
char.Trait2 = "Envergonhado"
}

if(TraitsDois == 6){
char.Trait2 = "Furioso"
}

if(TraitsUm == 7){
char.Trait2 = "Perseverante"
}

if(TraitsDois == 8){
char.Trait2 = "Traiçoeiro"
}
}

if(RollTraits == 3){
let TraitsUm = rollDice1d8()

if(TraitsUm == 1){
char.Trait1 = "Arrogante"
}

if(TraitsUm == 2){
char.Trait1 = "Brincalhao"
}

if(TraitsUm == 3){
char.Trait1 = "Esnobe"
}

if(TraitsUm == 4){
char.Trait1 = "Excentrico"
}

if(TraitsUm == 5){
char.Trait1 = "Serio"
}

if(TraitsUm == 6){
char.Trait1 = "Orgulhoso"
}

if(TraitsUm == 7){
char.Trait1 = "Heroico"
}

if(TraitsUm == 8){
char.Trait1 = "Teimoso"
}

let TraitsDois = rollDice1d8()

if(TraitsDois == 1){
char.Trait2 = "Audaz"
}

if(TraitsDois == 2){
char.Trait2 = "Bruto"
}

if(TraitsDois == 3){
char.Trait2 = "Covarde"
}

if(TraitsDois == 4){
char.Trait2 = "Docil"
}

if(TraitsDois == 5){
char.Trait2 = "Envergonhado"
}

if(TraitsDois == 6){
char.Trait2 = "Furioso"
}

if(TraitsDois == 7){
char.Trait2 = "Perseverante"
}

if(TraitsDois == 8){
char.Trait2 = "Traiçoeiro"
}

let TraitsTres = rollDice6()

if(TraitsTres == 1){
char.Trait3 = "Agil"
}

if(TraitsTres == 2){
char.Trait3 = "Ás"
}

if(TraitsTres == 3){
char.Trait3 = "Burro"
}

if(TraitsTres == 4){
char.Trait3 = "Desobediente"
}

if(TraitsTres == 5){
char.Trait3 = "Auge"
}

if(TraitsTres == 6){
char.Trait3 = "Genio"
}

}

if(Nature == 1){
char.Nature = "Adamant"
} else if(Nature == 2){
char.Nature = "Bold"
} else if(Nature == 3){
char.Nature = "Brave"
} else if(Nature == 4){
char.Nature = "Calm"
} else if(Nature == 5){
char.Nature = "Careful"
} else if(Nature == 6){
char.Nature = "Gentle"
} else if(Nature == 7){
char.Nature = "Hardy"
} else if(Nature == 8){
char.Nature = "Hasty"
} else if(Nature == 9){
char.Nature = "Impish"
} else if(Nature == 10){
char.Nature = "Jolly"
} else if(Nature == 11){
char.Nature = "Lax"
} else if(Nature == 12){
char.Nature = "Lonely"
} else if(Nature == 13){
char.Nature = "Mild"
} else if(Nature == 14){
char.Nature = "Modest"
} else if(Nature == 15){
char.Nature = "Naive"
} else if(Nature == 16){
char.Nature = "Naughty"
} else if(Nature == 17){
char.Nature = "Quiet"
} else if(Nature == 18){
char.Nature = "Rash"
} else if(Nature == 19){
char.Nature = "Relaxed"
} else if(Nature == 20){
char.Nature = "Sassy"
} else if(Nature == 21){
char.Nature = "Timid"
}

if(Inicio == 1){
NomeInicial = "Bulbasaur"
FindDex = db.get("usuarios").find({ Dex : NomeInicial }).value()
char.Lvl = 1
char.Nome = NomeInicial
char.HP = FindDex.HPLvl*char.Lvl
char.Atk = FindDex.AtkLvl*char.Lvl
char.Def = FindDex.DefLvl*char.Lvl
char.SpAtk = FindDex.SpAtkLvl*char.Lvl
char.SpDef = FindDex.SpDefLvl*char.Lvl
char.Spe = FindDex.SpeLvl*char.Lvl
msg.reply(`**${Treinador.Nome}** pode iniciar a jornada com um ***${NomeInicial} (Lvl: ${char.Lvl})***!

***Natureza***: *${char.Nature}*, ***Sexo***: ., ***Ability***: .

***Traits***: *${char.Trait1}*, *${char.Trait2}*, *${char.Trait3}*

*H.P IV's*: **${HPIV}**    *M.P IV's*: **${MPIV}**    *Spe IV's*: **${SpeIV}**

*Atk IV's*: **${AtkIV}**     *Sp. Atk IV's*: **${SpAtkIV}**

*Def IV's*: **${DefIV}**     *Sp. Def IV's*: **${SpDefIV}**`)
} else if (Inicio == 2){
NomeInicial = "Squirtle"
FindDex = db.get("usuarios").find({ Dex : NomeInicial }).value()
char.Lvl = 1
char.Nome = NomeInicial
char.HP = FindDex.HPLvl*char.Lvl
char.Atk = FindDex.AtkLvl*char.Lvl
char.Def = FindDex.DefLvl*char.Lvl
char.SpAtk = FindDex.SpAtkLvl*char.Lvl
char.SpDef = FindDex.SpDefLvl*char.Lvl
char.Spe = FindDex.SpeLvl*char.Lvl
msg.reply(`**${Treinador.Nome}** pode iniciar a jornada com um ***${NomeInicial} (Lvl: ${char.Lvl})***!

***Natureza***: *${char.Nature}*, ***Sexo***: ., ***Ability***: .

***Traits***: *${char.Trait1}*, *${char.Trait2}*, *${char.Trait3}*

*H.P IV's*: **${HPIV}**    *M.P IV's*: **${MPIV}**    *Spe IV's*: **${SpeIV}**

*Atk IV's*: **${AtkIV}**     *Sp. Atk IV's*: **${SpAtkIV}**

*Def IV's*: **${DefIV}**     *Sp. Def IV's*: **${SpDefIV}**`)
} else if (Inicio == 3){
msg.reply(`*Bulbasaur*`)
} else if (Inicio == 4){
msg.reply(`*Cyndaquil*`)
} else if (Inicio == 5){
msg.reply(`*Totodile*`)
} else if (Inicio == 6){
msg.reply(`*Chikorita*`)
} else if (Inicio == 7){
msg.reply(`*Eevee*`)
} else if (Inicio == 8){
msg.reply(`*Chansey*`)
} else if (Inicio == 9){
msg.reply(`*Abra*`)
} else if (Inicio == 10){
msg.reply(`*Poliwag*`)
} else if (Inicio == 11){
msg.reply(`*Munchlax*`)
} else if (Inicio == 12){
msg.reply(`*Dratini*`)
}
msg.delete()

/* db.get("usuarios")
.push({
Nome: `${NomeEncontro}`,
Tipo: `${FindDex.Tipo}`
})
.write() */

db.write()

}
if(inicio_comando == "ROTA1"){
let nome_personagem = msg.content.split(" ")
nome_personagem = nome_personagem.splice(1, 5)
nome_personagem = nome_personagem.join(" ")
    
let char = db.get("usuarios").find({Evento : "Encounter" }).value()

let id_member = msg.member.id
let Treinador = personagem_logado(id_member)

let Encontro = rollDice100()

let Nature = rollDice21()

let NomeEncontro = "."
let FindDex = "."

let HPIV = rollDice25()
let MPIV = rollDice25()
let SpeIV = rollDice12()
let AtkIV = rollDice12()
let DefIV = rollDice12()
let SpAtkIV = rollDice12()
let SpDefIV = rollDice12()

if(Encontro >= 1 && Encontro <= 20){
NomeEncontro = "Charmander"
FindDex = db.get("usuarios").find({ Dex : NomeEncontro }).value()
char.Lvl = rollDice4()
char.Nome = NomeEncontro
char.HP = FindDex.HPLvl*char.Lvl
char.Atk = FindDex.AtkLvl*char.Lvl
char.Def = FindDex.DefLvl*char.Lvl
char.SpAtk = FindDex.SpAtkLvl*char.Lvl
char.SpDef = FindDex.SpDefLvl*char.Lvl
char.Spe = FindDex.SpeLvl*char.Lvl
}

if(Encontro >= 21 && Encontro <= 50){
NomeEncontro = "Squirtle"
FindDex = db.get("usuarios").find({ Dex : NomeEncontro }).value()
char.Lvl = rollDice4()
char.Nome = NomeEncontro
char.HP = FindDex.HPLvl*char.Lvl
char.Atk = FindDex.AtkLvl*char.Lvl
char.Def = FindDex.DefLvl*char.Lvl
char.SpAtk = FindDex.SpAtkLvl*char.Lvl
char.SpDef = FindDex.SpDefLvl*char.Lvl
char.Spe = FindDex.SpeLvl*char.Lvl
}

if(Encontro >= 51 && Encontro <= 100){
NomeEncontro = "Bulbasaur"
FindDex = db.get("usuarios").find({ Dex : NomeEncontro }).value()
char.Lvl = rollDice4()
char.Nome = NomeEncontro
char.HP = FindDex.HPLvl*char.Lvl
char.Atk = FindDex.AtkLvl*char.Lvl
char.Def = FindDex.DefLvl*char.Lvl
char.SpAtk = FindDex.SpAtkLvl*char.Lvl
char.SpDef = FindDex.SpDefLvl*char.Lvl
char.Spe = FindDex.SpeLvl*char.Lvl
}

let RollTraits = rollDice3()

if(RollTraits == 1){
let TraitsUm = rollDice1d8()

char.Trait2 = "-"
char.Trait3 = "-"

if(TraitsUm == 1){
char.Trait1 = "Arrogante"
}

if(TraitsUm == 2){
char.Trait1 = "Brincalhao"
}

if(TraitsUm == 3){
char.Trait1 = "Esnobe"
}

if(TraitsUm == 4){
char.Trait1 = "Excentrico"
}

if(TraitsUm == 5){
char.Trait1 = "Heroico"
}

if(TraitsUm == 6){
char.Trait1 = "Orgulhoso"
}

if(TraitsUm == 7){
char.Trait1 = "Serio"
}

if(TraitsUm == 8){
char.Trait1 = "Teimoso"
}
}

if(RollTraits == 2){
let TraitsUm = rollDice1d8()

char.Trait3 = "-"

if(TraitsUm == 1){
char.Trait1 = "Arrogante"
}

if(TraitsUm == 2){
char.Trait1 = "Brincalhao"
}

if(TraitsUm == 3){
char.Trait1 = "Esnobe"
}

if(TraitsUm == 4){
char.Trait1 = "Excentrico"
}

if(TraitsUm == 5){
char.Trait1 = "Heroico"
}

if(TraitsUm == 6){
char.Trait1 = "Orgulhoso"
}

if(TraitsUm == 7){
char.Trait1 = "Serio"
}

if(TraitsUm == 8){
char.Trait1 = "Teimoso"
}

let TraitsDois = rollDice1d8()

if(TraitsDois == 1){
char.Trait2 = "Audaz"
}

if(TraitsDois == 2){
char.Trait2 = "Bruto"
}

if(TraitsDois == 3){
char.Trait2 = "Covarde"
}

if(TraitsDois == 4){
char.Trait2 = "Docil"
}

if(TraitsDois == 5){
char.Trait2 = "Envergonhado"
}

if(TraitsDois == 6){
char.Trait2 = "Furioso"
}

if(TraitsUm == 7){
char.Trait2 = "Perseverante"
}

if(TraitsDois == 8){
char.Trait2 = "Traiçoeiro"
}
}

if(RollTraits == 3){
let TraitsUm = rollDice1d8()

if(TraitsUm == 1){
char.Trait1 = "Arrogante"
}

if(TraitsUm == 2){
char.Trait1 = "Brincalhao"
}

if(TraitsUm == 3){
char.Trait1 = "Esnobe"
}

if(TraitsUm == 4){
char.Trait1 = "Excentrico"
}

if(TraitsUm == 5){
char.Trait1 = "Heroico"
}

if(TraitsUm == 6){
char.Trait1 = "Orgulhoso"
}

if(TraitsUm == 7){
char.Trait1 = "Serio"
}

if(TraitsUm == 8){
char.Trait1 = "Teimoso"
}

let TraitsDois = rollDice1d8()

if(TraitsDois == 1){
char.Trait2 = "Audaz"
}

if(TraitsDois == 2){
char.Trait2 = "Bruto"
}

if(TraitsDois == 3){
char.Trait2 = "Covarde"
}

if(TraitsDois == 4){
char.Trait2 = "Docil"
}

if(TraitsDois == 5){
char.Trait2 = "Envergonhado"
}

if(TraitsDois == 6){
char.Trait2 = "Furioso"
}

if(TraitsDois == 7){
char.Trait2 = "Perseverante"
}

if(TraitsDois == 8){
char.Trait2 = "Traiçoeiro"
}

let TraitsTres = rollDice10()

if(TraitsTres == 1){
char.Trait3 = "Agil"
}

if(TraitsTres == 2){
char.Trait3 = "Aprendiz Lento"
}

if(TraitsTres == 3){
char.Trait3 = "Burro"
}

if(TraitsTres == 4){
char.Trait3 = "Desobediente"
}

if(TraitsTres == 5){
char.Trait3 = "Diligente"
}

if(TraitsTres == 6){
char.Trait3 = "Genio"
}

if(TraitsTres == 7){
char.Trait3 = "Pragmatico"
}

if(TraitsTres == 8){
char.Trait3 = "Prodigio"
}

if(TraitsTres == 9){
char.Trait3 = "As"
}

if(TraitsTres == 10){
char.Trait3 = "Auge"
}

}

if(Nature == 1){
char.Nature = "Adamant"
} else if(Nature == 2){
char.Nature = "Bold"
} else if(Nature == 3){
char.Nature = "Brave"
} else if(Nature == 4){
char.Nature = "Calm"
} else if(Nature == 5){
char.Nature = "Careful"
} else if(Nature == 6){
char.Nature = "Gentle"
} else if(Nature == 7){
char.Nature = "Hardy"
} else if(Nature == 8){
char.Nature = "Hasty"
} else if(Nature == 9){
char.Nature = "Impish"
} else if(Nature == 10){
char.Nature = "Jolly"
} else if(Nature == 11){
char.Nature = "Lax"
} else if(Nature == 12){
char.Nature = "Lonely"
} else if(Nature == 13){
char.Nature = "Mild"
} else if(Nature == 14){
char.Nature = "Modest"
} else if(Nature == 15){
char.Nature = "Naive"
} else if(Nature == 16){
char.Nature = "Naughty"
} else if(Nature == 17){
char.Nature = "Quiet"
} else if(Nature == 18){
char.Nature = "Rash"
} else if(Nature == 19){
char.Nature = "Relaxed"
} else if(Nature == 20){
char.Nature = "Sassy"
} else if(Nature == 21){
char.Nature = "Timid"
}

/* db.get("usuarios")
.push({
Nome: `${NomeEncontro}`,
Tipo: `${FindDex.Tipo}`
})
.write() */

db.write()
msg.reply(`

**${Treinador.Nome}** encontrou um ***Wild ${NomeEncontro} (Lvl: ${char.Lvl})***!

***Natureza***: *${char.Nature}*, ***Sexo***: ., ***Ability***: .

***Traits***: *${char.Trait1}*, *${char.Trait2}*, *${char.Trait3}*, *${char.Trait4}*

*H.P IV's*: **${HPIV}**    *M.P IV's*: **${MPIV}**    *Spe IV's*: **${SpeIV}**

*Atk IV's*: **${AtkIV}**     *Sp. Atk IV's*: **${SpAtkIV}**

*Def IV's*: **${DefIV}**     *Sp. Def IV's*: **${SpDefIV}**`)
msg.delete()

}


})

function personagem_existe(nome_personagem){
  let usuario_existente = db.get("usuarios").find({ nome: nome_personagem }).value()
  return usuario_existente ? true : false
  }

function personagem_logado(id_member){
  let personagem = db.get("usuarios").find({id_membro: id_member}).value()
  return personagem ? personagem : false
  }

function rollDice(min, max) {
return min + Math.floor(Math.random() * (max-min + 1))
}

const rollDice2 = () => rollDice(1, 2)
const rollDice3 = () => rollDice(1, 3)
const rollDice4 = () => rollDice(1, 4)
const rollDice6 = () => rollDice(1, 6)
const rollDice1d8 = () => rollDice(1, 8)
const rollDice9 = () => rollDice(1, 9)
const rollDice10 = () => rollDice(1, 10)

const rollDice21 = () => rollDice(1, 21)
const rollDice25 = () => rollDice(1, 25)

const rollDice3d10 = () => rollDice(3, 30)
const rollDice4d10 = () => rollDice(4, 40)
const rollDice5d10 = () => rollDice(5, 50)
const rollDice6d10 = () => rollDice(6, 60)
  
const rollDice12 = () => rollDice(1, 12)

const rollDice15 = () => rollDice(1, 15)
  
const rollDice20 = () => rollDice(1, 20)
const rollDice2d20 = () => rollDice(2, 40)
const rollDice3d20 = () => rollDice(3, 60)

const rollDice7d10 = () => rollDice(7, 70)

const rollDice100 = () => rollDice(1, 100)

// Iniciar: nodemon tecnicas.js

// Run the command: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted

// Implantes

// Dezin

/* if (Fy.ICF)

if (Fy.ISF)

if (Fy.ISI)

if (Fy.ICB)

if (Fy.ICE)

if (Fy.ICP) 

Abaixo vai virar só os Implantes, esses sistemas de Equip não são necessários mais mas foi bom saber que a atualização dá certo com o nodemon */

/*

if (Fy.Armadura == "Equipando") {
  Fy.Armadura = "Equipada"
  db.write()
}

if (Fy.Armadura == "Desequipando") {
  Fy.Armadura = "Desequipada"
  db.write()
}

if (Fy.Arma == "Equipando") {
  Fy.Arma = "Equipada"
  db.write()
}

if (Fy.Arma == "Desequipando") {
  Fy.Arma = "Desequipada"
  db.write()
}

 esquema;
o 1 comando, equipando, é pra quando alguem usar o comando de equipar um item. o item vai ler os atributos q ganha e jogar pra 'equipada', q dá bonus constantes
*/

 }
}