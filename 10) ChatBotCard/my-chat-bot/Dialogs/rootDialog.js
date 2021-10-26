const { ComponentDialog, WaterfallDialog, DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
const { rootDialog, helpDialog, menuDialog } = require('../Constants/DialogIDs');
const { HelpDialog } = require('./helpDialog');
const { MenuDialog } = require('./menuDialog');

// WaterFallDialog name
const parseMsgWF = 'parseMsgWF';

class RootDialog extends ComponentDialog {
    constructor(conversationState) {
        super(rootDialog);

        // if not
        if (!conversationState) throw new Error('Conversation State is required');

        // initialize
        this.conversationState = conversationState;

        // adding waterfall dialog
        this.addDialog(new WaterfallDialog(parseMsgWF, [
            this.routeMessage.bind(this)
        ]))

        // Adding all Dialogs
        this.addDialog(new HelpDialog(conversationState));
        this.addDialog(new MenuDialog(conversationState));

        // initial Dialog
        this.initialDialogId = parseMsgWF;

    }

    async run(context, accessor) {
        try {

            // dialogSet is required to call different dialogs from RootDialogs
            const dialogSet = new DialogSet(accessor);
            // Anything which is running will be pushed or added in the dialogSet
            dialogSet.add(this);

            // dialogContext: It is a memory created for this dialogSet
            const dialogContext = await dialogSet.createContext(context);

            // storing dialogContext in result
            const results = await dialogContext.continueDialog();

            // If bot is in empty state ot bot has ended the conversation then if there is 'id'
            if (results && results.status === DialogTurnStatus.empty) {
                // begin the id
                await dialogContext.beginDialog(this.id);
            } else {
                console.log('dailog stack is empty');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async routeMessage(stepContext) {
        let userReply = stepContext.context.activity.text.toLowerCase();
        switch (userReply) {
            case 'menu':
                return await stepContext.beginDialog(menuDialog);
                break;

            case 'about us':

                break;

            case 'help':
                return await stepContext.beginDialog(helpDialog);
                break;

            default:
                await stepContext.context.sendActivity("Sorry i am still learning, can you Please refresh your Query.")
                break;
        }
    }
}

module.exports.RootDialog = RootDialog;