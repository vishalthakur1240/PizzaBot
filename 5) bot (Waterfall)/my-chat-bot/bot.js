const { ActivityHandler, CardFactory } = require('botbuilder');
const Recognizers = require("@microsoft/recognizers-text-suite");

//vishalthakur1240@gmail.com
// FOR UNIQUE ID
const { v4: uuidv4 } = require('uuid');

// CREATING QUESTIONS
const questions = {
    none: "none",
    name: "name",
    phone: "phone",
    email: "email",
    person: "person",
    date: "date"
}

class RestautrantBookingBot extends ActivityHandler {

    // GIVING TWO STATE
    constructor(userState, conversationState) {
        super();

        // IF TWO STATE IS NOT DEFINED
        if (!userState) throw new Error("UserState is not defined.");
        if (!conversationState) throw new Error("ConversationState is not defined.");

        // INITIALIZING TWO STATES
        this.userState = userState;
        this.conversationState = conversationState;

        // MAKING  Property (TUNNEL)
        this.conversationData = this.conversationState.createProperty("CONVDATA");
        this.userData = this.userState.createProperty("USERDATA");

        // STORING BOT WELCOME MESSAGE
        this.welcomeUser = this.userState.createProperty("IS_USER_WELCOME");
        
        // onMessage STARTED
        this.onMessage(async (context, next) => {

            // Creating flow and profile
            // flow = it will store lastQuestionAsked
            // profile = it will store users.data
            const flow = await this.conversationData.get(context, {
                lastQuestionAsked: questions.none
            })
            const profile = await this.userData.get(context, {});

            // Checking did bot said welcome or not only for the first time.
            const didBotWelcomeUser = await this.welcomeUser.get(context, false);
            if (didBotWelcomeUser == false) {
                await context.sendActivity("Welcome User");
                await this.welcomeUser.set(context, true);
            }

            // calling userDetails function
            await RestautrantBookingBot.userDetails(flow, profile, context);
            await next();
        });

        // this.onMembersAdded(async (context, next) => {
        // const membersAdded = context.activity.membersAdded;
        // let welcomeText;
        // for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        //     if (membersAdded[cnt].id !== context.activity.recipient.id) {
        //         welcomeText = `Welcome ${membersAdded[cnt].name}`;
        //         await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        //     }
        // }
        // await next();
        // });
    }

    // OUTSIDE CONSTRUCTOR
    // Saving changes of two states
    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }

    // TAKING USER DETAILS  
    static async userDetails(flow, profile, context) {

        // storing user's reply in "input"
        const input = context.activity.text;
        console.log(input);
        console.log(flow.lastQuestionAsked);

        let result;

        // Using SWITCH CASE
        switch (flow.lastQuestionAsked) {

            case questions.none:
                await context.sendActivity("What is you name?");
                flow.lastQuestionAsked = questions.name;
                break;

            // case questions.name:
            //     result = this.validateName(input);
            //     console.log(result);
            //     if (result.success) {
            //         profile.name = result.name;
            //         await context.sendActivity(`Your name is ${profile.name}`);
            //     }else{
            //         await context.sendActivity(result.msg || "Sorry i did not understand you.")
            //     }
            //     break;

            case questions.name:

                // validate name
                result = this.validateName(input);
                console.log(result);

                // if true
                if (result.success == true) {

                    // store result in profile
                    profile.name = result.name;

                    // print ans
                    await context.sendActivity(`I have your name ${profile.name}.`);

                    //ask next question
                    await context.sendActivity("What is you phone?");

                    // change lastQuestionAsked in flow
                    flow.lastQuestionAsked = questions.phone;
                } else {

                    // if flase print the reason
                    await context.sendActivity(
                        result.message || "I'm sorry, I didn't understand that."
                    );
                }
                break;

            case questions.phone:
                result = this.validatePhone(input);
                if (result.success) {
                    profile.phone = result.phone;
                    await context.sendActivity(`Your ph number is ${profile.phone}.`);
                    await context.sendActivity("What is your Email?");
                    flow.lastQuestionAsked = questions.email;
                } else {
                    await context.sendActivity(
                        result.message || "I'm sorry, I didn't understand that."
                    );
                }
                // await context.sendActivity(``);

                break;

            case questions.email:
                result = this.validateEmail(input);
                console.log(result);
                if (result.success) {
                    profile.email = result.email;
                    await context.sendActivity(`Your email is ${profile.email}.`);
                    await context.sendActivity("For how many person you want booking?");
                    flow.lastQuestionAsked = questions.person;
                } else {
                    await context.sendActivity(
                        result.msg || "I'm sorry, I didn't understand that."
                    );
                }
                break;

            case questions.person:
                profile.person = input;
                await context.sendActivity(`Total no of person is: ${profile.person}.`);
                await context.sendActivity("What is you date of booking?");
                flow.lastQuestionAsked = questions.date;
                break;


            case questions.date:
                result = this.validateDate(input);
                if (result.success) {
                    profile.date = result.date;
                    await context.sendActivity(`Your date of booking is ${profile.date}.`);

                    let uid = uuidv4();

                    await context.sendActivity(`Your order ID is: ${uid},
                    ${profile.name} with Phone no: ${profile.phone} and email: ${profile.email}, with ${profile.person} no of people is coming to stay in our Restataurant on ${profile.date}.`);

                    await this.sendIntroCard(context, profile);


                    
                } else {
                    await context.sendActivity(
                        result.message || "I'm sorry, I didn't understand that."
                    );
                }
                break;



            default: context.sendActivity(`${reply}`);
                break;
        }


    }

    static validateName(input){

        // validating
        const validate = input && input.trim();

        // if validated
        if (validate != undefined) {
            return {
                success: true,
                name: input
            }
        }else{

            // if not validated
            return{
                success: false,
                msg: "please enter a name with at least one character"
            }
        }
    }

    // static validateName(input) {
    //     const validate = input && input.trim();
    //     return validate != undefined
    //         ? { success: true, name: input }
    //         : {
    //             success: false,
    //             message: "Please enter a name that contains at least one character.",
    //         };
    // }
    static validatePhone(input) {
        const validate = input && input.length <= 10 && input.trim();
        return validate != undefined
            ? { success: true, phone: input }
            : {
                success: false,
                message: "Please enter a valid phone Number",
            };
    }
    static validateDate(input) {
        try {
            const results = Recognizers.recognizeDateTime(
                input,
                Recognizers.Culture.English
            );
            const now = new Date();
            const earliest = now.getTime() + 60 * 60 * 1000;
            let output;
            results.forEach((result) => {
                result.resolution.values.forEach((resolution) => {
                    const datevalue = resolution.value || resolution.start;
                    const datetime =
                        resolution.type === "time"
                            ? new Date(`${now.toLocaleDateString()} ${datevalue}`)
                            : new Date(datevalue);
                    if (datetime && earliest < datetime.getTime()) {
                        output = { success: true, date: datetime.toLocaleDateString() };
                        return;
                    }
                });
            });
            return (
                output || {
                    success: false,
                    message: "I'm sorry, please enter a date at least an hour out.",
                }
            );
        } catch (error) {
            return {
                success: false,
                message:
                    "I'm sorry, I could not interpret that as an appropriate date. Please enter a date at least an hour out.",
            };
        }
    }

    static validateEmail(input) {
        console.log(input);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
            return {
                success: true,
                email: input
            }
        } else {
            return {
                success: false,
                msg: "Please Enter a valid EMAIL."
            }
        }
    }

    static async sendIntroCard(context, profile) {
        const card = CardFactory.heroCard(
            'Thanks You! For using our Bot.',
            `Restaurant is booked for: ${profile.name}`,
        );
        await context.sendActivity({ attachments: [card] });
    }

    

}

module.exports.RestautrantBookingBot = RestautrantBookingBot;
