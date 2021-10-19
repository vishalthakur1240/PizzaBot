// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

// OTP-Generator purpose
const { sendMail } = require('./mailfolder/otpSender');
const otpGenerator = require('otp-generator');
let otpmsg = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

const questions = {
    none: "none",
    email: "email",
    otp: "otp"
}

class EchoBot extends ActivityHandler {
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

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
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
            await EchoBot.userDetails(flow, profile, context);
            await next();
        });

        // this.onMembersAdded(async (context, next) => {
        //     const membersAdded = context.activity.membersAdded;
        //     const welcomeText = 'Hello and welcome!';
        //     for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        //         if (membersAdded[cnt].id !== context.activity.recipient.id) {
        //             await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        //         }
        //     }
        //     // By calling next() you ensure that the next BotHandler is run.
        //     await next();
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
                await context.sendActivity("What is you EMAIL?");
                flow.lastQuestionAsked = questions.email;
                break;

            case questions.email:
                result = this.validateEmail(input);
                console.log(result);
                if (result.success) {
                    profile.email = result.email;
                    await context.sendActivity(`OTP sent at: ${profile.email}.`);

                    // Calling otpSender.js
                    let body = {
                        subject: otpmsg,
                        description: `Your  email: ${profile.email} has received our OTP. Rate our OTP`
                    }
                    await sendMail(profile.email, body);

                    await context.sendActivity("Provide your received OTP below.");
                    flow.lastQuestionAsked = questions.otp;

                } else {
                    await context.sendActivity(
                        result.msg || "I'm sorry, I didn't understand that."
                    );
                }
                break;

            case questions.otp:

                // validate otp
                result = this.validateOTP(input, otpmsg);
                console.log(result);
                console.log(otpmsg);
                // if true
                if (result.success == true) {

                    // store result in profile
                    profile.otp = result.otp;

                    // print ans
                    await context.sendActivity(`Your OTP: ${profile.otp} matched with the send OTP.`);

                } else {

                    // if flase print the reason
                    await context.sendActivity(
                        result.msg || "I'm sorry, I didn't understand that."
                    );
                }
                break;

            default: context.sendActivity(`${reply}`);
                break;
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

    static validateOTP(input, otpmsg) {
        // validating
        const validate = input && input.trim();

        // if validated
        if (validate == otpmsg) {
            return {
                success: true,
                otp: input
            }
        } else {

            // if not validated
            return {
                success: false,
                msg: "Invalid OTP. Please enter again."
            }
        }
    }

}

module.exports.EchoBot = EchoBot;
