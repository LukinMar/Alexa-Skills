const Alexa = require('ask-sdk-core');
const Util = require('./util.js');

const { randomize } = require('./functions/randomize');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
         const speakOutput = 'Olá, você acabou de entrar no mundo das lendas brasileiras. Gostaria de ouvir uma história?';
        // const speakOutput = '<audio src:"s3://90365880-1bd0-4c78-8830-f9ebaeeb4428-us-east-1/Media/teste3.mp3" />'
        
    //   const audioUrl = Util.getS3PreSignedUrl("Media/teste3.mp3").replace(/&/g,'&amp;');
    //   const pictureUrl = Util.getS3PreSignedUrl("Media/naia.jpg");
      
        return handlerInput.responseBuilder
        .speak(speakOutput)
                // .speak(`teste alexa usando audio <audio src="${audioUrl}"/>`)
            //   .withStandardCard('Lendas brasileiras', 'Vitória-Regia', pictureUrl)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        
        const lendas = [
                        
                        ["Vitória-Regia", "Media/audio/vitoria-regia.mp3", "Media/pictures/naia.jpg"],
                        ["Lobisomem", "Media/audio/lobisomem.mp3", "Media/pictures/Lobisomem.png"],
                        ["Iara", "Media/audio/iara.mp3", "Media/pictures/Iara.jpg"],
                        ["Cuca", "Media/audio/cuca.mp3", "Media/pictures/cuca.png"],
                        ["Boitata", "Media/audio/boitata.mp3", "Media/pictures/boitata.png"],
                        ["Curupira", "Media/audio/curupira.mp3", "Media/pictures/curupira.png"],
                        ["Lenda do Uirapuru", "Media/audio/uirapuru.mp3", "Media/pictures/uirapuru.jpg"],
                        ["Saci", "Media/audio/saci.mp3", "Media/pictures/saci.jpg"],
                        // ["Boto-cor-de-rosa", "Media/audio/boto.mp3", "Media/pictures/boto.jpg"],
                        // ["Saci", "O saci é um menino negrinho que fuma um cachimbo e apronta diversas travessuras pelas fazendas: trança o rabo do cavalo, azeda o leite fresco e vive por aí em rodamoinhos, se escondendo e pregando peças em todo mundo. Ele tem uma perna só e usa um gorro vermelho, que lhe dá o poder de sumir e aparecer em outro lugar em instantes. Diz a lenda que ele também arrancava as penas da cauda dos papagaios e enrolava a língua do tamanduá. Quem quiser controlar as brincadeiras do saci, que deixam todo mundo com raiva, precisa pegar seu gorro vermelho. A história era contada principalmente pelos escravos africanos para assustar as crianças, filhas dos fazendeiros que eram donos dos escravos.", "Media/pictures/saci.jpg"],
                        // ["Iara","'A sereia Iara, metade humana e metade peixe, tem sua casa no fundo das águas mais profundas dos rios brasileiros. Ela aparece sempre na beira dos rios, sentada em uma pedra, penteando seus cabelos e cantando lindas canções. É uma mulher linda, que gosta de atrair os pescadores com seu canto e sua voz doce direto para o fundo do rio. A lenda da Iara foi trazida pelos portugueses. Baseada em alguns mitos gregos, a sereia gosta de enfeitar seus cabelos e os pescadores de todo o país já sabem: ao ouvir uma música com voz de mulher, todos tapam os ouvidos para não serem levados para o fundo do rio.", "Media/pictures/Iara.jpg"],
                        // ["Curupira","Um menino comum, exceto pela cabeleira vermelha, pela pele esverdeada e pelos pés virados para traz. Apesar da aparência um pouco assustadora, o Curupira é o grande protetor das florestas e dos animais brasileiros. Sua lenda é conhecida desde antes dos portugueses chegarem no Brasil. Ele é o espírito da floresta que cuida de toda a natureza.Seus pés virados para trás despistam os caçadores, deixando rastros falsos em todos os lugares. Assim, os caçadores se perdem por dias dentro da mata, sem conseguir lembrar o caminho de volta.", "Media/pictures/curupira.png"],
                        // ["Lobisomem", "Media/audio/lobisomem.mp3", "Media/pictures/Lobisomem.png"],
                        // ["Cuca", "Quem nunca ouviu antes de dormir a música: “Dorme neném, que a Cuca vem pegar. Papai tá na roça e mamãe foi trabalhar”? A Cuca é uma figura folclórica que ninguém sabe ao certo com o que se parece. Muitas pessoas dizem que é uma velha corcunda, que vive desgrenhada. Outras ainda dizem que é um jacaré enorme de olhos amarelos que consegue andar apenas com as patas traseiras, como no Sítio do Pica-pau Amarelo.Ela vive em uma caverna escura, onde faz bruxarias. Toda vez que alguma mãe canta a música para seu filho dormir, a Cuca acorda para ir atrás da criança. Mas ela não faz mal nenhum, só fica por perto, vendo as crianças dormirem. O que assusta mesmo é sua aparência.", "Media/pictures/cuca.png"],
                        // ["Boitata", "A lenda diz que essa cobra gigantesca de olhos grandes que mais parecem bolas de fogo foi o único animal que sobreviveu a um dilúvio que houve na Terra. Ela se escondeu debaixo das águas, em um lugar escuro, e esperou que o dilúvio passasse. Os viajantes dizem que veem o boitatá principalmente a noite, rastejando pela floresta com seus olhos grandes e brilhantes. O boitatá também protege as matas contra incêndios, mas pode perseguir os caçadores e incendiários das florestas se esbarrar com um. Por isso, quando um viajante avista o boitatá deve ficar parado de olhos fechados para mostrar que está ali em paz.", "Media/boitata.png"],
          ]

                    var lendaEscolhida = lendas.randomElement()

                    var nomeLenda = lendaEscolhida[0]
                    var lenda = lendaEscolhida[1];
                    var imagem = lendaEscolhida[2];
                    
          const audioUrl = Util.getS3PreSignedUrl(`${lenda}`).replace(/&/g,'&amp;')
          const pictureUrl = Util.getS3PreSignedUrl(`${imagem}`);
          
          console.log(nomeLenda)
                    
    // const speakOutput = '<audio src="https://90365880-1bd0-4c78-8830-f9ebaeeb4428-us-east-1.s3.amazonaws.com/Media/teste3.mp3" />';
        
        return handlerInput.responseBuilder
            // .speak(lenda)
            .speak(`<audio src="${audioUrl}"/>`)
            .withStandardCard('Lendas brasileiras', `${nomeLenda}`, pictureUrl)
            .withShouldEndSession(true)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Caso você queira ouvir uma história, diga sim, caso contrário, diga não. Gostaria de ouvir uma história?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Até logo!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const AboutIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AboutIntent';
    },
 handle(handlerInput) {
       const speakOutput = 'As histórias foram contadas por Iris Regina';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        
        const speakOutput = 'Desculpe, Eu não sei nada sobre isso. Por favor, tente novamente. Gostaria de ouvir uma lenda?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        AboutIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
