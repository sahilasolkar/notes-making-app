const fs = require('fs')
const chalk = require('chalk')
const { array } = require('yargs')

//adding notes
const addNotes = (title, body)=> {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>note.title===title)
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse(('new note added')))
    }
    else{
        console.log(chalk.red.inverse('note title taken'))
    }
}

//reading notes
const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note)=>note.title === title)
    if(note){
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('no note found'))
    }
}

//saving notes
const saveNotes = (notes)=>{
    const dataJASON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJASON)
}

//removing notes
const removeNotes = (title)=>{
    
    const notes = loadNotes()
    
    const notesToKeep = notes.filter((note)=>note.title !== title)

    saveNotes(notesToKeep)

    if (notesToKeep.length==notes.length){
        console.log(chalk.red.inverse('No note found!'))
    }
    else{
        console.log(chalk.green.inverse('note removed!'))
    }

}

const loadNotes = ()=>{

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }

}

const ListNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your Notes'))
    notes.forEach((note)=> console.log(note.title))
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    ListNotes: ListNotes,
    readNotes: readNotes
}