
const { ActivityHandler, MessageFactory, ActivityTypes, ActionTypes, CardFactory } = require('botbuilder');

const {IntroCard} = require('./Card/monthCard');


class EchoBot extends ActivityHandler {
    constructor() {
        super();

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            console.log(membersAdded);
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id != context.activity.recipient.id) {
                    let welcomeUser = `Welcome ${membersAdded[cnt].name}`;
                    context.sendActivity(MessageFactory.text(welcomeUser));
                }
            }
            await next();
        });

        this.onMessage(async (context, next) => {
            let reply = context.activity.text.toLowerCase();
            switch (reply) {
                case 'hi': context.sendActivity('Hello');
                    break;
                case 'menu': await this.sendIntroCard(context);
                    break;
                case 'leave': await context.sendActivity(`You want Leave?`);
                    break;
                case 'salary': await this.sendIntroCard2(context);
                    break;
                // case 'salaryyes': await context.sendActivity(`Salary given`);
                //     break;
                // case 'salaryno': await context.sendActivity(`Salary not given`);
                //     break;
                case 'salaryyes': await IntroCard(context);
                    break;
                case 'fullmonth': await context.sendActivity(`Salary for fullmonth given`);
                    break;
                case 'halfmonth': await context.sendActivity(`Salary for halfmonth given`);
                    break;
                case 'salaryno': await context.sendActivity(`Salary not given`);
                    break;
                default: context.sendActivity(`${reply}`);
                    break;
            }
        });
    }

    async sendIntroCard(context) {
        const card = CardFactory.heroCard(
            'Welcome to Bot Framework!',
            'Welcome to Welcome Users bot sample! This Introduction card is a great way to introduce your Bot to the user and suggest some things to get them started. We use this opportunity to recommend a few next steps for learning more creating and deploying bots.',
            ['https://aka.ms/bf-welcome-card-image'],
            [
                {
                    type: ActionTypes.PostBack,
                    title: 'Leave Management',
                    value: 'leave'
                },
                {
                    type: ActionTypes.PostBack,
                    title: 'Salary Management',
                    value: 'salary'
                }
            ]
        );

        await context.sendActivity({ attachments: [card] });
    }

    //part2
    async sendIntroCard2(context) {
        const card = CardFactory.heroCard(
            'You want Salary ?',
            'Please Click below section to move further',
            ['https://aka.ms/bf-welcome-card-image'],
            [
                {
                    type: ActionTypes.PostBack,
                    title: 'Yes',
                    value: 'salaryyes'
                },
                {
                    type: ActionTypes.PostBack,
                    title: 'No',
                    value: 'salaryno'
                }
            ]
        );

        await context.sendActivity({ attachments: [card] });
    }

    // //part3
    // async sendIntroCard3(context) {
    //     const card = CardFactory.heroCard(
    //         'You want Salary, Fine.',
    //         'Please Click below section to move further',
    //         ['https://aka.ms/bf-welcome-card-image'],
    //         [
    //             {
    //                 type: ActionTypes.PostBack,
    //                 title: 'For Full Month?',
    //                 value: 'fullmonth'
    //             },
    //             {
    //                 type: ActionTypes.PostBack,
    //                 title: 'For Half Month',
    //                 value: 'halfmonth'
    //             }
    //         ]
    //     );

    //     await context.sendActivity({ attachments: [card] });
    // }
}

module.exports.EchoBot = EchoBot;
