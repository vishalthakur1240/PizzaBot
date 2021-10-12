//part3
const {ActionTypes, CardFactory } = require('botbuilder');
const sendIntroCard3 = async (context)  => {
    const card = CardFactory.heroCard(
        'You want Salary, Fine.',
        'Please Click below section to move further',
        ['https://aka.ms/bf-welcome-card-image'],
        [
            {
                type: ActionTypes.PostBack,
                title: 'For Full Month?',
                value: 'fullmonth'
            },
            {
                type: ActionTypes.PostBack,
                title: 'For Half Month',
                value: 'halfmonth'
            }
        ]
    );

    await context.sendActivity({ attachments: [card] });
}

module.exports.IntroCard = sendIntroCard3;