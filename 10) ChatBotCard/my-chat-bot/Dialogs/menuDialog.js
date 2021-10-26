const { ComponentDialog, WaterfallDialog, ChoicePrompt, ChoiceFactory, NumberPrompt } = require('botbuilder-dialogs');
const { menuDialog } = require('../Constants/DialogIDs');
const { menuCard, confirmPizza } = require('../Card/card');
const { CardFactory } = require('botbuilder-core');

// Waterfall Dialog name
const menuDialogWF = 'menuDialogWF';
const ChoicePromptDialog = 'ChoicePromptDialog';
const NumberPromptDialog = 'NumberPromptDialog';
const PizzaChoicePrompt = 'PizzaChoicePrompt';
let dialogData;

class MenuDialog extends ComponentDialog {
    constructor(conversationState) {
        super(menuDialog);

        // if not
        if (!conversationState) throw new Error('Conversation State is required');

        // initialize
        this.conversationState = conversationState;

        // MAKING  Property (TUNNEL)
        this.applyPizzaStateAccessor = this.conversationState.createProperty('applyPizzaState');

        // adding waterfall dialog
        this.addDialog(new ChoicePrompt(ChoicePromptDialog));
        this.addDialog(new NumberPrompt(NumberPromptDialog));
        this.addDialog(new ChoicePrompt(PizzaChoicePrompt));
        
        this.addDialog(new WaterfallDialog(menuDialogWF, [
            this.sendMenu.bind(this),
            this.sendSizeMenu.bind(this),
            this.sendPizzaQuantity.bind(this),
            this.orderPizza.bind(this)
        ]))

        // initial Dialog
        this.initialDialogId = menuDialogWF;
    }

    async sendMenu(stepContext) {
        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(menuCard())]
        });
        
        // return await stepContext.prompt(PizzaChoicePrompt, {
        //     prompt: `Which PIZZA you want to try?`,
        //     choices: ChoiceFactory.toChoices(['Cheese N Corn', 'Peppy Paneer', 'Non Veg Supreme', 'Chicken Golden Delight'])
        // })

        return await stepContext.prompt(ChoicePromptDialog, {
            prompt: `Which PIZZA you want to try?`,
            choices: ChoiceFactory.toChoices(['Cheese N Corn', 'Peppy Paneer', 'Non Veg Supreme'])
        })

    }
    async sendSizeMenu(stepContext) {
        dialogData = await this.applyPizzaStateAccessor.get(stepContext.context, {})
        dialogData.pizzaType = stepContext.result.value;
        
        return await stepContext.prompt(ChoicePromptDialog, {
            prompt: `Which Size of ${dialogData.pizzaType} Do you want?`,
            choices: ChoiceFactory.toChoices(['Large', 'Medium', 'Small'])
        })
    }
    async sendPizzaQuantity(stepContext) {
        dialogData = await this.applyPizzaStateAccessor.get(stepContext.context)
        dialogData.pizzaSize = stepContext.result.value;
                
        return await stepContext.prompt(NumberPromptDialog, `How many ${dialogData.pizzaType} of ${dialogData.pizzaSize} you want?`)
    }
    async orderPizza(stepContext) {
        dialogData = await this.applyPizzaStateAccessor.get(stepContext.context)
        dialogData.pizzaQty = stepContext.result;

        await stepContext.context.sendActivity({
            attachments: [
                CardFactory.adaptiveCard(confirmPizza(dialogData.pizzaType, dialogData.pizzaSize, dialogData.pizzaQty))
            ]
        })

        return stepContext.endDialog();
    }

}

module.exports.MenuDialog = MenuDialog;