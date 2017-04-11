'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    "en-GB": {
        "translation": {
            "SKILL_NAME" : "Virtual Shopping",
            "HELP_MESSAGE" : "You can tell me what to search for you, or you may exit. What can I help you with?",
            "CONT_MESSAGE": "Do you want to search more?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!",
        },
    },
    "en-US": {
        "translation": {
            "SKILL_NAME" : "Virtual Shopping",
            "HELP_MESSAGE" : "You can tell me what to search for you, or you may exit. What can I help you with?",
            "CONT_MESSAGE": "Do you want to search more?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!",
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "Welcome to the world of Virtual shopping. What are you looking for today?");
    },
    'GetSearchResults': function(){
        const itemSlot = this.event.request.intent.slots.Item;
        const speechOutput = itemSlot.value;
        this.emit(':tell', "I am showing you "+speechOutput+ " on your Virtual Reality device."); //, this.t("CONT_MESSAGE"));
        //ContinueMessage();
    },
    'ContinueMessage': function(){
        this.emit(':ask', this.t("CONT_MESSAGE"));
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t("HELP_MESSAGE");
        const reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};