const notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk')
const { ListNotes } = require('./notes.js')

//customize yargs version
yargs.version('1.1.0')

//create add command

yargs.command({
	command: 'add',
	describe: 'add a new note',
	builder:{
		title:{
			describe: 'note title',
			demandOption: true,
			type : 'string'
		},
		body:{
			describe: 'note body',
			demandOption: true, 
			type: 'string'
		}
	},
	handler(argv) {
		notes.addNotes(argv.title, argv.body)
	}
})

//create remove command 

yargs.command({
	command: 'remove',
	describe: 'remove a note', 
	builder: {
		title:{
			describe: 'note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.removeNotes(argv.title)
	}
})

//create list command 

yargs.command({
	command:'list',
	describe: 'list all notes',
	handler(){
		notes.ListNotes()
	}
})

//create read command 

yargs.command({
	command:'read',
	describe: 'read notes',
	builder:{
		title: {
			describe: 'note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.readNotes(argv.title)
	}
})

//add, remove, read, list

// console.log(yargs.argv)

yargs.parse()