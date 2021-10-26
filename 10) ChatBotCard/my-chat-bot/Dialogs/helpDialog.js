const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');
const { helpDialog } = require('../Constants/DialogIDs');
const { helpCard } = require('../Card/card');
const { CardFactory } = require('botbuilder');

// WaterFallDialog name
const helpDialogWF1 = 'helpDialogWF1';

class HelpDialog extends ComponentDialog {
    constructor(conversationState) {
        super(helpDialog);

        // if not
        if(!conversationState) throw new Error('Conversation State is required');

        // initialize
        this.conversationState = conversationState;

        // adding waterfall dialog
        this.addDialog(new WaterfallDialog(helpDialogWF1, [
            this.sendHelp.bind(this)
        ]))

        // initial Dialog
        this.initialDialogId = helpDialogWF1;

    }

    async sendHelp(stepContext) {
        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(helpCard())]
        });
        await stepContext.context.sendActivity({
            attachments: [CardFactory.heroCard(
                'Here are some suggestions that you can try: ',
                null,
                CardFactory.actions([
                    {
                        type: 'imBack',
                        title: 'Menu',
                        value: 'Menu'
                    },
                    {
                        type: 'imBack',
                        title: 'About Us',
                        value: 'About Us'
                    },
                    {
                        type: 'imBack',
                        title: 'Help',
                        value: 'Help'
                    }
                ])
            )]
        }) 
        
        return await stepContext.endDialog();
    }
}

module.exports.HelpDialog = HelpDialog;