const { ActivityHandler, CardFactory, MessageFactory } = require('botbuilder');
const { welcomeCard } = require('./Card/card');


class BotFile extends ActivityHandler {
    constructor(conversationState, rootDialog) {
        super();

        if (!conversationState) throw new Error('conversationState is not defined.');
        this.conversationState = conversationState;
        this.rootDialog = rootDialog;
        this.accessor = this.conversationState.createProperty('DialogAccessor');

        // Message Event
        this.onMessage(async (context, next) => {
            // let userReply = context.activity.text.toLowerCase();
            // switch (userReply) {
            //     case 'menu':

            //         break;

            //     case 'about us':

            //         break;

            //     case 'help':
            //         // Cutted from here and taken to helpDialog.js
            //         break;

            //     default:
            //         await context.sendActivity("Sorry i am still learning, can you Please refresh your Query.")
            //         break;
            // }

            await this.rootDialog.run(context, this.accessor);
            await next();
        })

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            let welcomeText;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    welcomeText = `Welcome ${membersAdded[cnt].name}`;
                    // await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));

                    // This will send Bot image
                    await context.sendActivity(welcomeCard());

                    // This will send user, options to be clicked
                    await context.sendActivity({
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
                }
            }

        })
    }

    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, false);
    }
}

module.exports.BotFile = BotFile;