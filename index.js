// Load Libraries

const Discord = require('discord.js');
const fs = require('fs')
const low = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')

// Database

const adapter = new FileSync('usuarios.json')
const db = low(adapter)

// Starts the Bot
const rpgBot = new Discord.Client();
const token = 'codigo aqui';
rpgBot.login(token)
rpgBot.on('ready', () => {
    console.log('Pronto!')
})

// Loads Data
const tecnicas = require('./data/tecnicas.js')
tecnicas.all(rpgBot,db)

// Loads users files

var usuarios = {}
fs.readFile('./usuarios.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    usuarios = JSON.parse(data).usuarios
    // console.log(usuarios[0].nome)
  })

// Command to log in a character

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "LOGIN"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")

        let char = db.get("usuarios").find({Nome : nome_personagem}).value()
        let id_member = msg.member.id
        let deslogando = personagem_logado(id_member)
        let atualizar = null

        db.get("usuarios").find({ id_personagem: char.id_personagem }).assign({ id_membro: id_member }).value()
        db.get("usuarios").find({ id_personagem: deslogando.id_personagem }).assign({ id_membro: atualizar }).value()
        db.write()
        msg.delete()
    }
})

// How our commands will reach our characters

function personagem_existe(nome_personagem){
    let usuario_existente = db.get("usuarios").find({ nome: nome_personagem }).value()
    return usuario_existente ? true : false
    }

function atualiza_usuarios(){
    let new_usuarios = {
        "usuarios": usuarios

    }

    fs.writeFile("./usuarios.json", JSON.stringify(new_usuarios), 'utf8', err => {
        if (err) throw err;
        console.log('File has been saved!');
      });
    }

// Used when i want the person to target its own character

function personagem_logado(id_member){
        // let Ficha = db.get("usuarios").find({id_membro : id_member}).value()

        // if(Ficha.Ativo){
        // console.log("if")
        // let Ativo = db.get("Ativos").find({nome : Ficha.Ativo}).value()
        // console.log(Ativo)
        //     // db.get("usuarios").find({ nome : nome_personagem }).assign({ mp: mp_gasta}).value()
        // } else {
        //     console.log("else")
        //     return Ficha
        // }
    let personagem = db.get("usuarios").find({id_membro : id_member}).value()
    return personagem ? personagem : false
    }

/* Players spreadsheets, they manually chose the major attributes (força = strength, agilidade = agility...), i updated the values here for them and let the system calculate
the attributes minor values and do a final count of every attribute so they could know if they had more Level than Max Attributes. If they had more Level, they could
manually Level Up and choose more attributes
*/

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "ENCOUNTER"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")
    
        let char = db.get("usuarios").find({Nome : "Encounter" }).value()
        let id_member = msg.member.id
        let Vig = 6
        let Agi = 3
        let Des = 10
        let Int = 2
        let Car = 4
        let Von = 7

        let Trait1 = rollDice20()
        char.Vig = Vig*1
        char.Des = Des*1
        char.Agi = Agi*1
        char.Car = Car*1
        char.Int = Int*1
        char.Von = Von*1
        char.Pts_Atributo = Vig+Agi+Des+Car+Int+Von
        char.FA = Math.ceil(Vig*4)
        char.FD = Math.ceil(Vig*2.5) + Math.ceil(Des*2.5)
        char.AC = Math.ceil(Des*1.3) + Math.ceil(Agi*0.5)
        char.ES = Math.ceil(Agi*1.5) + Math.ceil(Vig*0.5)
        char.Ini = Math.ceil(Agi*0.5)
        char.Vel = Math.ceil(Agi*0.5)
        char.Fur = Math.ceil(Int*0.5)
        char.FATemp = 0
        char.FDTemp = 0
        char.ACTemp = 0
        char.ESTemp = 0
        char.DifVel = 0
        db.write()
        msg.reply('Atualizado!')}
})

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "FICHAZAKAR"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")
    
        let char = db.get("usuarios").find({Nome : "Zakar" }).value()
        let id_member = msg.member.id
        let Vig = 8
        let Agi = 5
        let Des = 11+1
        let Int = 2
        let Car = 2
        let Von = 4
        char.Pts_Atributo = Vig+Agi+Des+Car+Int+Von
        char.Vig = Vig*1
        char.Des = Des*1
        char.Agi = Agi*1
        char.Car = Car*1
        char.Int = Int*1
        char.Von = Von*1
        char.Max_HP = 100
        char.HP = 100
        char.FA = Math.ceil(Vig*3)
        char.FD = Math.ceil(Vig*2.5) + Math.ceil(Des*1.5)
        char.AC = Math.ceil(Des*1) + Math.ceil(Agi*0.5)
        char.ES = Math.ceil(Agi*1.5)
        char.Ini = Math.ceil(Agi*0.5)
        char.Vel = Math.ceil(Agi*0.5)
        char.Fur = Math.ceil(Int*0.5)
        db.write()
        msg.reply('Atualizado!')}
})

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "FICHAJOFFREY"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")
    
        let char = db.get("usuarios").find({Nome : "Joffrey" }).value()
        let id_member = msg.member.id
        let Vig = 5
        let Agi = 9+1
        let Des = 7
        let Int = 4
        let Car = 5
        let Von = 2
        char.Pts_Atributo = Vig+Agi+Des+Car+Int+Von
        char.Vig = Vig*1
        char.Des = Des*1
        char.Agi = Agi*1
        char.Car = Car*1
        char.Int = Int*1
        char.Von = Von*1
        char.Max_HP = 100
        char.HP = 100
        char.FA = Math.ceil(Vig*3)
        char.FD = Math.ceil(Vig*2.5) + Math.ceil(Des*1.5)
        char.AC = Math.ceil(Des*1) + Math.ceil(Agi*0.5)
        char.ES = Math.ceil(Agi*1.5)
        char.Ini = Math.ceil(Agi*0.5)
        char.Vel = Math.ceil(Agi*0.5)
        char.Fur = Math.ceil(Int*0.5)
        char.Carga = Vig*1
        db.write()
        msg.reply('Atualizado!')}
})

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "FICHAEDDARD"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")
    
        let char = db.get("usuarios").find({Nome : "Eddard" }).value()
        let id_member = msg.member.id
        let Vig = 7
        let Agi = 5
        let Des = 5
        let Int = 5
        let Car = 6
        let Von = 4
        char.Pts_Atributo = Vig+Agi+Des+Car+Int+Von
        char.Vig = Vig*1
        char.Des = Des*1
        char.Agi = Agi*1
        char.Car = Car*1
        char.Int = Int*1
        char.Von = Von*1
        char.Max_HP = 100
        char.HP = 100
        char.FA = Math.ceil(Vig*3)
        char.FD = Math.ceil(Vig*2.5) + Math.ceil(Des*1.5)
        char.AC = Math.ceil(Des*1) + Math.ceil(Agi*0.5)
        char.ES = Math.ceil(Agi*1.5)
        char.Ini = Math.ceil(Agi*0.5)
        char.Vel = Math.ceil(Agi*0.5)
        char.Fur = Math.ceil(Int*0.5)
        char.Carga = Vig*1
        db.write()
        msg.reply('Atualizado!')}
})

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "MOLDENPC"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")
    
        let id_member = msg.member.id
        let char = personagem_logado(id_member)
        let Vig = 7
        let Agi = 5
        let Des = 5
        let Int = 5
        let Car = 6
        let Von = 4
        char.Pts_Atributo = Vig+Agi+Des+Car+Int+Von
        char.Vig = Vig*1
        char.Des = Des*1
        char.Agi = Agi*1
        char.Car = Car*1
        char.Int = Int*1
        char.Von = Von*1
        char.Max_HP = 100
        char.HP = 100
        char.FA = Math.ceil(Vig*3)
        char.FD = Math.ceil(Vig*2.5) + Math.ceil(Des*1.5)
        char.AC = Math.ceil(Des*1) + Math.ceil(Agi*0.5)
        char.ES = Math.ceil(Agi*1.5)
        char.Ini = Math.ceil(Agi*0.5)
        char.Vel = Math.ceil(Agi*0.5)
        char.Fur = Math.ceil(Int*0.5)
        db.write()
        msg.reply('Atualizado!')}
})

// Cria um NPC com os Modificadores ideais

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "NPCUP"){
        let nome_personagem = msg.content.split(" ")
        nome_personagem = nome_personagem.splice(1, 5)
        nome_personagem = nome_personagem.join(" ")
    
        let char = db.get("usuarios").find({Nome : nome_personagem}).value()
        char.Max_HP = 100
        char.HP = 100
        let Vig = 6
        let Agi = 10
        let Des = 8
        let Int = 2
        let Car = 5
        let Von = 5
        char.Vig = Vig*1
        char.Des = Des*1
        char.Agi = Agi*1
        char.Car = Car*1
        char.Int = Int*1
        char.Von = Von*1
        char.Pts_Atributo = Vig+Agi+Des+Car+Int+Von
        char.FA = Math.ceil(Vig*4)
        char.FD = Math.ceil(Vig*2.5) + Math.ceil(Des*2.5)
        char.AC = Math.ceil(Des*1.3) + Math.ceil(Agi*0.5)
        char.ES = Math.ceil(Agi*1.5) + Math.ceil(Vig*0.5)
        char.Ini = Math.ceil(Agi*0.5)
        char.Vel = Math.ceil(Agi*0.5)
        char.Fur = Math.ceil(Int*0.5)
        char.FATemp = 0
        char.FDTemp = 0
        char.ACTemp = 0
        char.ESTemp = 0
        char.DifVel = 0
        db.write()

        msg.reply('NPC Criado!')}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "POKEDEX"){
let nome_personagem = msg.content.split(" ")
nome_personagem = nome_personagem.splice(1, 5)
nome_personagem = nome_personagem.join(" ")
   
let char = db.get("usuarios").find({Dex : nome_personagem}).value()

msg.reply(`Lendo a *Pokedex de* *${char.Numero}*: ***${char.Dex}***

*Tipo*: **${char.Tipo}** - **${char.Tipo2}**

*HP p Lv*: **${char.HPLvl}**   *MP p Lv*: **${char.MPLvl}**     *Spe p Lv*: **${char.SpeLvl}**

*Atk p Lv*: **${char.AtkLvl}**   *Def p Lv*: **${char.DefLvl}**

*SpAtk p Lv*: **${char.SpAtkLvl}**   *SpDef p Lv*: **${char.SpDefLvl}**

***Abilities***: *${char.Abilities}*

***Move List***: *${char.Moves}*`)
msg.delete()

if(char.Dex == "Bulbasaur"){
msg.reply({
files: [
'./pics/bulba.gif'
]
})} else if(char.Dex == "Ivysaur"){
msg.reply({
files: [
'./pics/ivysa.gif'
]
})} else if(char.Dex == "Venusaur"){
msg.reply({
files: [
'./pics/venusa.gif'
]
})} else if(char.Dex == "Charmander"){
msg.reply({
files: [
'./pics/char.gif'
]
})} else if(char.Dex == "Charmeleon"){
msg.reply({
files: [
'./pics/charme.gif'
]
})} else if(char.Dex == "Charizard"){
msg.reply({
files: [
'./pics/charizard.gif'
]
})} else if(char.Dex == "Squirtle"){
msg.reply({
files: [
'./pics/squi.gif'
]
})} else if(char.Dex == "Wartortle"){
msg.reply({
files: [
'./pics/wartortle.gif'
]
})} else if(char.Dex == "Blastoise"){
msg.reply({
files: [
'./pics/blastoise.gif'
]
})} else if(char.Dex == "Caterpie"){
msg.reply({
files: [
'./pics/caterpie.gif'
]
})} else if(char.Dex == "Metapod"){
msg.reply({
files: [
'./pics/metapod.gif'
]
})} else if(char.Dex == "Butterfree"){
msg.reply({
files: [
'./pics/butterfree.gif'
]
})} else if(char.Dex == "Weedle"){
msg.reply({
files: [
'./pics/weedle.gif'
]
})} else if(char.Dex == "Kakuna"){
msg.reply({
files: [
'./pics/kakuna.gif'
]
})} else if(char.Dex == "Beedrill"){
msg.reply({
files: [
'./pics/beedrill.gif'
]
})} else if(char.Dex == "Pidgey"){
msg.reply({
files: [
'./pics/pidgey.gif'
]
})} else if(char.Dex == "Pidgeotto"){
msg.reply({
files: [
'./pics/pidgeotto.gif'
]
})} else if(char.Dex == "Pidgeot"){
msg.reply({
files: [
'./pics/pidgeot.gif'
]
})} else if(char.Dex == "Rattata"){
msg.reply({
files: [
'./pics/rattata.gif'
]
})} else if(char.Dex == "Raticate"){
msg.reply({
files: [
'./pics/raticate.gif'
]
})} else if(char.Dex == "Spearow"){
msg.reply({
files: [
'./pics/spearow.gif'
]
})} else if(char.Dex == "Fearow"){
msg.reply({
files: [
'./pics/fearow.gif'
]
})} else if(char.Dex == "Ekans"){
msg.reply({
files: [
'./pics/ekans.gif'
]
})} else if(char.Dex == "Arbok"){
msg.reply({
files: [
'./pics/arbok.gif'
]
})} else if(char.Dex == "Pikachu"){
msg.reply({
files: [
'./pics/pikachu.gif'
]
})} else if(char.Dex == "Raichu"){
msg.reply({
files: [
'./pics/raichu.gif'
]
})} else if(char.Dex == "Sandshrew"){
msg.reply({
files: [
'./pics/sandshrew.gif'
]
})} else if(char.Dex == "Sandslash"){
msg.reply({
files: [
'./pics/sandslash.gif'
]
})} else if(char.Dex == "Nidoran-F"){
msg.reply({
files: [
'./pics/nidoran_f.gif'
]
})} else if(char.Dex == "Nidorina"){
msg.reply({
files: [
'./pics/nidorina.gif'
]
})} else if(char.Dex == "Nidoqueen"){
msg.reply({
files: [
'./pics/nidoqueen.gif'
]
})} else if(char.Dex == "Nidoran-M"){
msg.reply({
files: [
'./pics/nidoran_m.gif'
]
})} else if(char.Dex == "Nidorino"){
msg.reply({
files: [
'./pics/nidorino.gif'
]
})} else if(char.Dex == "Nidoking"){
msg.reply({
files: [
'./pics/nidoking.gif'
]
})} else if(char.Dex == "Clefairy"){
msg.reply({
files: [
'./pics/clefairy.gif'
]
})} else if(char.Dex == "Clefable"){
msg.reply({
files: [
'./pics/clefable.gif'
]
})} else if(char.Dex == "Vulpix"){
msg.reply({
files: [
'./pics/vulpix.gif'
]
})} else if(char.Dex == "Ninetales"){
msg.reply({
files: [
'./pics/ninetales.gif'
]
})} else if(char.Dex == "Jigglypuff"){
msg.reply({
files: [
'./pics/jigglypuff.gif'
]
})} else if(char.Dex == "Wigglytuff"){
msg.reply({
files: [
'./pics/wigglytuff.gif'
]
})} else if(char.Dex == "Zubat"){
msg.reply({
files: [
'./pics/zubat.gif'
]
})} else if(char.Dex == "Golbat"){
msg.reply({
files: [
'./pics/golbat.gif'
]
})} else if(char.Dex == "Oddish"){
msg.reply({
files: [
'./pics/oddish.gif'
]
})} else if(char.Dex == "Gloom"){
msg.reply({
files: [
'./pics/gloom.gif'
]
})} else if(char.Dex == "Vileplume"){
msg.reply({
files: [
'./pics/vileplume.gif'
]
})} else if(char.Dex == "Paras"){
msg.reply({
files: [
'./pics/paras.gif'
]
})} else if(char.Dex == "Parasect"){
msg.reply({
files: [
'./pics/parasect.gif'
]
})} else if(char.Dex == "Venonat"){
msg.reply({
files: [
'./pics/venonat.gif'
]
})} else if(char.Dex == "Venomoth"){
msg.reply({
files: [
'./pics/venomoth.gif'
]
})} else if(char.Dex == "Diglett"){
msg.reply({
files: [
'./pics/diglett.gif'
]
})} else if(char.Dex == "Dugtrio"){
msg.reply({
files: [
'./pics/dugtrio.gif'
]
})} else if(char.Dex == "Meowth"){
msg.reply({
files: [
'./pics/meowth.gif'
]
})} else if(char.Dex == "Persian"){
msg.reply({
files: [
'./pics/persian.gif'
]
})} else if(char.Dex == "Psyduck"){
msg.reply({
files: [
'./pics/psyduck.gif'
]
})} else if(char.Dex == "Golduck"){
msg.reply({
files: [
'./pics/golduck.gif'
]
})} else if(char.Dex == "Mankey"){
msg.reply({
files: [
'./pics/mankey.gif'
]
})} else if(char.Dex == "Primeape"){
msg.reply({
files: [
'./pics/primeape.gif'
]
})} else if(char.Dex == "Growlithe"){
msg.reply({
files: [
'./pics/growlithe.gif'
]
})} else if(char.Dex == "Arcanine"){
msg.reply({
files: [
'./pics/arcanine.gif'
]
})} else if(char.Dex == "Poliwag"){
msg.reply({
files: [
'./pics/poliwag.gif'
]
})} else if(char.Dex == "Poliwhirl"){
msg.reply({
files: [
'./pics/poliwhirl.gif'
]
})} else if(char.Dex == "Poliwrath"){
msg.reply({
files: [
'./pics/poliwrath.gif'
]
})} else if(char.Dex == "Abra"){
msg.reply({
files: [
'./pics/abra.gif'
]
})} else if(char.Dex == "Kadabra"){
msg.reply({
files: [
'./pics/kadabra.gif'
]
})} else if(char.Dex == "Alakazam"){
msg.reply({
files: [
'./pics/alakazam.gif'
]
})} else if(char.Dex == "Machop"){
msg.reply({
files: [
'./pics/machop.gif'
]
})} else if(char.Dex == "Machoke"){
msg.reply({
files: [
'./pics/machoke.gif'
]
})} else if(char.Dex == "Machamp"){
msg.reply({
files: [
'./pics/machamp.gif'
]
})} else if(char.Dex == "Bellsprout"){
msg.reply({
files: [
'./pics/bellsprout.gif'
]
})} else if(char.Dex == "Weepinbell"){
msg.reply({
files: [
'./pics/weepinbell.gif'
]
})} else if(char.Dex == "Victreebel"){
msg.reply({
files: [
'./pics/victreebel.gif'
]
})} else if(char.Dex == "Tentacool"){
msg.reply({
files: [
'./pics/tentacool.gif'
]
})} else if(char.Dex == "Tentacruel"){
msg.reply({
files: [
'./pics/tentacruel.gif'
]
})} else if(char.Dex == "Geodude"){
msg.reply({
files: [
'./pics/geodude.gif'
]
})} else if(char.Dex == "Graveler"){
msg.reply({
files: [
'./pics/graveler.gif'
]
})} else if(char.Dex == "Golem"){
msg.reply({
files: [
'./pics/golem.gif'
]
})} else if(char.Dex == "Ponyta"){
msg.reply({
files: [
'./pics/ponyta.gif'
]
})} else if(char.Dex == "Rapidash"){
msg.reply({
files: [
'./pics/rapidash.gif'
]
})} else if(char.Dex == "Crobat"){
msg.reply({
files: [
'./pics/crobat.gif'
]
})}

}
})

// My players could type this to check the character they were logged in

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "CHECK"){
        let id_member = msg.member.id
        let ver = personagem_logado(id_member)
        msg.reply(`Vendo informações de **${ver.Nome} ${ver.Casa}** ${ver.Foto}
        
        **HP Max:** ${ver.Max_HP}, **HP Atual:** ${ver.HP}

        **Armadura:** ${ver.Armadura}

        **Arma:** ${ver.Arma}

        **XP:** ${ver.XP}, **Nivel:** ${ver.Nivel}, **Pts de Atributo:** ${ver.Pts_Atributo}

        **FA:** ${ver.FA}, **FD:** ${ver.FD}

        **AC:** ${ver.AC}, **ES:** ${ver.ES}, **Ini:** ${ver.Ini}, **Vel:** ${ver.Vel}
        
        **Vigor:** ${ver.Vig}, **Destreza:** ${ver.Des}, **Agilidade:** ${ver.Agi}
        
        **Intelecto:** ${ver.Int}, **Carisma:** ${ver.Car}, **Vontade:** ${ver.Von}

        **Caracteristicas:** ${ver.Caracter}

        **Defeitos:** ${ver.Defeitos}`)
        msg.delete()
    }
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "CHECKHID"){
let id_member = msg.member.id
let ver = personagem_logado(id_member)
msg.reply(`Vendo informações de ${ver.Nome} ${ver.Casa} ${ver.Foto}
        
**HP Max:** ${ver.Max_HP}, **HP Atual:** ${ver.HP}

**Armadura:** ${ver.Armadura}

**Arma:** ${ver.Arma}

**Nivel:** ${ver.Nivel}, **Pts de Atributo:** ${ver.Pts_Atributo}`)
msg.delete()
}
})

rpgBot.on('message',msg=>{
    let inicio_comando = msg.content.toUpperCase().split(" ")[0]
    if(inicio_comando == "MODS"){
        let id_member = msg.member.id
        let ver = personagem_logado(id_member)
msg.reply(`Vendo informações de **${ver.Nome} ${ver.Casa}**

**Estilo:** ${ver.Estilo}

**Ataque:** ${ver.Ataque}

**Defesa:** ${ver.Defesa}

**Peso:** ${ver.Peso}

**Manuseio:** ${ver.Manuseio}

**Leveza:** ${ver.Leveza}

**Proteção:** ${ver.Protecao}

**Fio:** ${ver.Fio}

**Tamanho:** ${ver.Tamanho}`)
msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "NORTE"){
let id_member = msg.member.id
let ver = personagem_logado(id_member)
msg.reply(`*Informações do Norte*

**Starks**: 8.000

**Boltons**: 3.000

**Mormonts**: 2.000

**Manderlys**: 5.000

**Lordes Juramentados**: 17.000`, {
files: [
'./pics/north.jpg'
]
})
        msg.delete()
    }
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "FLUVIO"){
let id_member = msg.member.id
let ver = personagem_logado(id_member)
msg.reply(`*Informações das Riverlands [*

**Blackwoods**: 8.000

**Brackens**: 8.000

**Tullys**: 3.000

**Freys**: 4.000

**Lordes Juramentados**: 10.000`, {
files: [
'./pics/riverl.jpg'
]
})
msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "VALE"){
let id_member = msg.member.id
let ver = personagem_logado(id_member)
msg.reply(`msg`, {
files: [
'./pics/vale.jpg'
]
})
msg.delete()
}
})


rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "CROWN"){
let id_member = msg.member.id
let ver = personagem_logado(id_member)
msg.reply(`*Informações das Terras Coroadas* : 25.000

***Frota Real***: 60 (Em King's Landing, dos Targaryens), 20 (Em Dragonstone, dos Targaryens), 140 (Em Driftmark, dos Velaryons)`)
msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "OCIDENTE"){
let id_member = msg.member.id
let ver = personagem_logado(id_member)
msg.reply(`*Informações do Ocidente* : 45.000 / 45.000

***Lannisters***: 15.000

***Reynes***: 6.000

***Marbrands***: 4.000

***Vassalos***: 20.000

***Frota Lannister***: 60`, {
files: [
'./pics/westerlands.jpg'
]
})
msg.delete()
}
})

rpgBot.on('message',msg=>{
let inicio_comando = msg.content.toUpperCase().split(" ")[0]
if(inicio_comando == "CAMPINA"){
let id_member = msg.member.id
let ver = personagem_logado(id_member)
msg.reply(`Informações da Campina : **70.000 - 70.000**

***Rowans***: 10.000

***Peakes***: 4.000

***Florents***: 2.000

***Tarlys***: 5.000

***Tyrells***: 20.000

***Hightowers***: 15.000

***Redwynes***: 4.000

***Vassalos***: 10.000

***Frota Hightower***: 20

***Frota Redwyne***: 200`, {
files: [
'./pics/reach.jpg'
]
})
msg.delete()
}
})

// carro

// Unfinished

function ConsultaFicha(nome_personagem){
    let Ficha = db.get("usuarios").find({nome : nome_personagem}).value()

    if(Ficha.ativo){
    console.log("if")
    let Ativo = db.get("Ativos").find({nome : Ficha.ativo}).value()
    console.log(Ativo)
        // db.get("usuarios").find({ nome : nome_personagem }).assign({ mp: mp_gasta}).value()
    } else {
        console.log("else")
        return Ficha
    }
}