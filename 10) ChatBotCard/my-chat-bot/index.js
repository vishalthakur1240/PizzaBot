// 1) IMPORTINIG
const restify = require('restify');
const { BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
const { BotFile } = require('./BotFile');
const { RootDialog } = require('./Dialogs/rootDialog');


// 2) ADAPTER INIT (for connecting to AZURE)
const adapter = new BotFrameworkAdapter({
    appId:'',
    appPassword:''
})

// 3) ADAPTER ERROR HANDLER
adapter.onTurnError = async(context, error) =>{
    console.log('Error is: ', error);

    // send msg to user about the error
    await context.sendActivity('Dude, Bot encountered an error.')
}

// 4) CREATING SERVER
let server = restify.createServer();
server.listen(3978, ()=>{
    console.log(`${server.name} listening at ${server.url}`);
})

const memory = new MemoryStorage();
const conversationState = new ConversationState(memory);

// ACTIVITY HANDLER OBJECT
const rootDialog = new RootDialog(conversationState);
const mainBot = new BotFile(conversationState, rootDialog);


server.post('/api/messages', (req, res)=>{
    adapter.processActivity(req, res, async(context)=>{
        await mainBot.run(context);
    })
})