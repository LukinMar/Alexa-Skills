// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const axios = require("axios");
const cheerio = require('cheerio');

async function pegarBanheirosProximos(lat, lng){
    
    //Faz a requisição na API
    const result = await axios.post('https://toiletfy.com.br/alexa', {"latUser": lat, "lngUser": lng});
    
    //Caso a requisição tenha sucesso    
    try {
        console.log(result.data);
        return result.data;
    //Caso a requisição tenha algum erro    
    } catch(err){
        console.log(err);
        return "ERRO";
    }
    
}

async function pegarBanheirosProximosAdaptado(lat, lng){
    
    //Faz a requisição na API
    const result = await axios.post('https://toiletfy.com.br/adaptado', {"latUser": lat, "lngUser": lng});
    
    //Caso a requisição tenha sucesso    
    try {
        console.log(result.data);
        return result.data;
    //Caso a requisição tenha algum erro    
    } catch(err){
        console.log(err);
        return "ERRO";
    }
    
}


    const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Olá, este é o Toiletfái. <break time="300ms"/> Aqui você pode localizar o banheiro mais próximo da sua localização.<break time="200ms"/> Gostaria de encontrar o banheiro mais próximo ou o banheiro adaptado mais próximo?';
          return handlerInput.responseBuilder
        .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
         
// const LaunchRequestHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
//     },
//     async handle(handlerInput) {
        
//         let speechOutput;
//         let resposta;
        
//         //Caso o usuário não tenha dado permissão de localização, irá falar essa mensagem.
//         if ((!handlerInput.requestEnvelope.session.user.permissions.consentToken) || (handlerInput.requestEnvelope.session.user.permissions.scopes["alexa::devices:all:geolocation:read"].status === "DENIED")) {
//             speechOutput = 'Olá! Para localizar um banheiro próximo, eu preciso saber a sua localização!  Você pode fazer isso no aplicativo Alexa em: <break time="500ms"/>Menu <break time="500ms"/>Skills e Jogos <break time="500ms"/>Suas Skills, e selecione a skill Toiletfái. <break time="1s"/>Clique em Configurações, e clique em Gerenciar Permissões. <break time="1s"/>Selecione a opção "Acesso a localização", e clique em "SALVAR PERMISSÕES". Assim que fizer esses passos, é só falar: <break time="200ms"/>Alexa, localizar banheiros"'
            
//             return handlerInput.responseBuilder
//                 .speak(speechOutput)
//                 .withAskForPermissionsConsentCard(["alexa::devices:all:geolocation:read"])
//                 .withShouldEndSession(true)
//                 .getResponse();           
            
            
//         } else {
//             var geoObject = handlerInput.requestEnvelope.context.Geolocation;
//             console.log(JSON.stringify(geoObject))
            
//             //Captura as coordenadas do usuário
//             let latitude = geoObject.coordinate.latitudeInDegrees;
//             let longitude = geoObject.coordinate.longitudeInDegrees;
            
//             //Aqui ira receber o retorno da função, que será um array.
//             const banheirosProximos = await pegarBanheirosProximos(latitude, longitude);
            
//             //Pegará o banheiro mais próximo
//             const banheiroMaisProximo = banheirosProximos[0];
//             console.log('Banheiro mais próximo => '+banheiroMaisProximo);
            
//             //Caso não encontre nenhum banheiro, irá falar isso.
//             if(banheiroMaisProximo === undefined){
//                 resposta = "Nenhum banheiro por perto encontrado!"
//             //Caso encontre algum banheiro, ira falar o local.    
//             } else {
//                 //Pega a informação do banheiro.
//                 var $ = cheerio.load(banheiroMaisProximo);
//                 let observacaoFormatada = banheiroMaisProximo.observacao.replace("<br><br> ", "");
//                 let observacao = observacaoFormatada == "" ? " " : observacaoFormatada + "!";
//                 let informacao = $(banheiroMaisProximo.informacao).attr('title') == " " ? " " : $(banheiroMaisProximo.informacao).attr('title')+ "!";
//                 let dados = observacao == " " && informacao == " " ?  "Este banheiro ainda não possui nenhuma observação sobre o uso!" : observacao + informacao;
//                 console.log("informacao direta" + banheiroMaisProximo.informacao);
//                 console.log("observação direta" + banheiroMaisProximo.observacao);
//                 console.log("ifnormacao "+ informacao);
//                 console.log("observacao "+ observacao);
//                 console.log("dados "+ dados);
//                 //Pega a avaliação do banheiro.
//                 let avaliacao = banheiroMaisProximo.avaliacao.replace("<br><br> ", "")
//                 var $2 = cheerio.load(avaliacao);
//                 let avalicaoFormatada = $2(avaliacao).attr('title') == " " ? "Nenhuma avaliação existente!" : $2(avaliacao).attr('title');
//                 resposta = `O banheiro mais próximo de sua localização está em: ${banheiroMaisProximo.nomelocal}. ${banheiroMaisProximo.endereco}. Ele está a ${banheiroMaisProximo.distancia.toFixed(2)} km de você! Observação: ${dados} Avaliação: ${avalicaoFormatada}`
//             }
            
//             return handlerInput.responseBuilder
//                 .speak(resposta)
//                 .withSimpleCard('Banheiro mais próximo:', resposta)
//                 .withShouldEndSession(true)
//                 .getResponse();  

//         }
//     }
// };

const banheiroIntentHandler = { 
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'banheiroIntent';
    },
       async handle(handlerInput) {
        
        let speechOutput;
        let resposta;
        
        //Caso o usuário não tenha dado permissão de localização, irá falar essa mensagem.
        if ((!handlerInput.requestEnvelope.session.user.permissions.consentToken) || (handlerInput.requestEnvelope.session.user.permissions.scopes["alexa::devices:all:geolocation:read"].status === "DENIED")) {
            speechOutput = 'Olá! Para localizar um banheiro próximo, eu preciso saber a sua localização!  Você pode fazer isso no aplicativo Alexa em: <break time="500ms"/>Menu <break time="500ms"/>Skills e Jogos <break time="500ms"/>Suas Skills, e selecione a skill Toiletfái. <break time="1s"/>Clique em Configurações, e clique em Gerenciar Permissões. <break time="1s"/>Selecione a opção "Acesso a localização", e clique em "SALVAR PERMISSÕES". Assim que fizer esses passos, é só falar: <break time="200ms"/>Alexa, localizar banheiros"'
            
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .withAskForPermissionsConsentCard(["alexa::devices:all:geolocation:read"])
                .withShouldEndSession(true)
                .getResponse();           
            
            
        } else {
            var geoObject = handlerInput.requestEnvelope.context.Geolocation;
            console.log(JSON.stringify(geoObject))
            
            //Captura as coordenadas do usuário
            let latitude = geoObject.coordinate.latitudeInDegrees;
            let longitude = geoObject.coordinate.longitudeInDegrees;
            
            //Aqui ira receber o retorno da função, que será um array.
            const banheirosProximos = await pegarBanheirosProximos(latitude, longitude);
            
            //Pegará o banheiro mais próximo
            const banheiroMaisProximo = banheirosProximos[0];
            console.log('Banheiro mais próximo => '+banheiroMaisProximo);
            
            //Caso não encontre nenhum banheiro, irá falar isso.
            if(banheiroMaisProximo === undefined){
                resposta = "Nenhum banheiro por perto encontrado!"
            //Caso encontre algum banheiro, ira falar o local.    
            } else {
                //Pega a informação do banheiro.
                var $ = cheerio.load(banheiroMaisProximo);
                let observacaoFormatada = banheiroMaisProximo.observacao.replace("<br><br> ", "");
                let observacao = observacaoFormatada == "" ? " " : observacaoFormatada + "!";
                let informacao = $(banheiroMaisProximo.informacao).attr('title') == " " ? " " : $(banheiroMaisProximo.informacao).attr('title')+ "!";
                let dados = observacao == " " && informacao == " " ?  "Este banheiro ainda não possui nenhuma observação sobre o uso!" : observacao + informacao;
                console.log("informacao direta" + banheiroMaisProximo.informacao);
                console.log("observação direta" + banheiroMaisProximo.observacao);
                console.log("ifnormacao "+ informacao);
                console.log("observacao "+ observacao);
                console.log("dados "+ dados);
                //Pega a avaliação do banheiro.
                let avaliacao = banheiroMaisProximo.avaliacao.replace("<br><br> ", "")
                var $2 = cheerio.load(avaliacao);
                let avalicaoFormatada = $2(avaliacao).attr('title') == " " ? "Nenhuma avaliação existente!" : $2(avaliacao).attr('title');
                resposta = `O banheiro mais próximo de sua localização está em: ${banheiroMaisProximo.nomelocal}. ${banheiroMaisProximo.endereco}. Ele está a ${banheiroMaisProximo.distancia.toFixed(2)} km de você! Observação: ${dados} Avaliação: ${avalicaoFormatada}`
            }
            
            return handlerInput.responseBuilder
                .speak(resposta)
                .withSimpleCard('Banheiro mais próximo:', resposta)
                .withShouldEndSession(true)
                .getResponse();  

        }
    }
};


const AdaptadoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AdaptadoIntent';
    },
    async handle(handlerInput) {
        let speechOutput;
        let resposta;
        
        //Caso o usuário não tenha dado permissão de localização, irá falar essa mensagem.
        if ((!handlerInput.requestEnvelope.session.user.permissions.consentToken) || (handlerInput.requestEnvelope.session.user.permissions.scopes["alexa::devices:all:geolocation:read"].status === "DENIED")) {
            speechOutput = 'Olá! Para localizar um banheiro próximo, eu preciso saber a sua localização!  Você pode fazer isso no aplicativo Alexa em: <break time="500ms"/>Menu <break time="500ms"/>Skills e Jogos <break time="500ms"/>Suas Skills, e selecione a skill Toiletfái. <break time="1s"/>Clique em Configurações, e clique em Gerenciar Permissões. <break time="1s"/>Selecione a opção "Acesso a localização", e clique em "SALVAR PERMISSÕES". Assim que fizer esses passos, é só falar: <break time="200ms"/>Alexa, localizar banheiros"'
            
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .withAskForPermissionsConsentCard(["alexa::devices:all:geolocation:read"])
                .withShouldEndSession(true)
                .getResponse();           
            
            
        } else {
            var geoObject = handlerInput.requestEnvelope.context.Geolocation;
            console.log(JSON.stringify(geoObject))
            
            //Captura as coordenadas do usuário
            let latitude = geoObject.coordinate.latitudeInDegrees;
            let longitude = geoObject.coordinate.longitudeInDegrees;
            
            //Aqui ira receber o retorno da função, que será um array.
            const banheirosProximos = await pegarBanheirosProximosAdaptado(latitude, longitude);
            
            //Pegará o banheiro mais próximo
            const banheiroMaisProximo = banheirosProximos[0];
            console.log('Banheiro mais próximo => '+banheiroMaisProximo);
            
            //Caso não encontre nenhum banheiro, irá falar isso.
            if(banheiroMaisProximo === undefined){
                resposta = "Nenhum banheiro adaptado por perto encontrado!"
            //Caso encontre algum banheiro, ira falar o local.    
            } else {
                //Pega a informação do banheiro.
                var $ = cheerio.load(banheiroMaisProximo);
                let observacaoFormatada = banheiroMaisProximo.observacao.replace("<br><br> ", "");
                let observacao = observacaoFormatada == "" ? " " : observacaoFormatada + "!";
                let informacao = $(banheiroMaisProximo.informacao).attr('title') == " " ? " " : $(banheiroMaisProximo.informacao).attr('title')+ "!";
                let dados = observacao == " " && informacao == " " ?  "Este banheiro ainda não possui nenhuma observação sobre o uso!" : observacao + informacao;
                console.log("informacao direta" + banheiroMaisProximo.informacao);
                console.log("observação direta" + banheiroMaisProximo.observacao);
                console.log("ifnormacao "+ informacao);
                console.log("observacao "+ observacao);
                console.log("dados "+ dados);
                //Pega a avaliação do banheiro.
                let avaliacao = banheiroMaisProximo.avaliacao.replace("<br><br> ", "")
                var $2 = cheerio.load(avaliacao);
                let avalicaoFormatada = $2(avaliacao).attr('title') == " " ? "Nenhuma avaliação existente!" : $2(avaliacao).attr('title');
                resposta = `O banheiro adaptado mais próximo de sua localização está em: ${banheiroMaisProximo.nomelocal}. ${banheiroMaisProximo.endereco}. Ele está a ${banheiroMaisProximo.distancia.toFixed(2)} km de você! Observação: ${dados} Avaliação: ${avalicaoFormatada}`
            }
            
            return handlerInput.responseBuilder
                .speak(resposta)
                .withSimpleCard('Banheiro mais próximo:', resposta)
                .withShouldEndSession(true)
                .getResponse();
        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Para usar o Toiletfái, eu preciso saber a sua localização!  Você pode fazer isso no aplicativo da Alexa em: <break time="500ms"/>Menu <break time="500ms"/>Skills e Jogos <break time="500ms"/>Suas Skills, e selecione a skill Toiletfái. <break time="1s"/>Clique em Configurações, e clique em Gerenciar Permissões. <break time="1s"/>Selecione a opção "Acesso a localização", e clique em "SALVAR PERMISSÕES". Assim que fizer esses passos, é só falar: <break time="200ms"/>Alexa, localizar banheiros, que irei te dizer qual o banheiro mais próximo, a sua informação e sua avaliação';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const AboutIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AboutIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O Toiletfái, foi desenvolvido por Lucas Martins, inicialmente como uma brincadeira e acabou virando trabalho de conclusão de curso. Para cadastrar novos banheiros use o aplicativo ou o site. Procure por Toiletfái na loja de aplicativos do Android ou clique no link na descrição da Skill.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withShouldEndSession(true)
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
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
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

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Desculpe, a Skill Toiletfái só funciona no aplicativo Alexa. Caso você esteja usando o aplicativo Alexa, será necessário saber a sua localização.`;
 
 if ((!handlerInput.requestEnvelope.session.user.permissions.consentToken) || (handlerInput.requestEnvelope.session.user.permissions.scopes["alexa::devices:all:geolocation:read"].status === "DENIED")) {
        const speakOutput = 'Para localizar um banheiro próximo, eu preciso saber a sua localização!  Você pode fazer isso no aplicativo Alexa em: <break time="500ms"/>Menu <break time="500ms"/>Skills e Jogos <break time="500ms"/>Suas Skills, e selecione a skill Toiletfái. <break time="1s"/>Clique em Configurações, e clique em Gerenciar Permissões. <break time="1s"/>Selecione a opção "Acesso a localização", e clique em "SALVAR PERMISSÕES". Assim que fizer esses passos, é só falar: <break time="200ms"/>Alexa, localizar banheiros"'
 }
 
 return handlerInput.responseBuilder
                .speak(speakOutput)
                .withAskForPermissionsConsentCard(["alexa::devices:all:geolocation:read"])
                .withShouldEndSession(true)
                .getResponse();           
    }
};

const FallbackIntentHandler = {
 canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
      const FALLBACK_MESSAGE = `O Toiletfái ajuda a localizar banheiros próximos da sua localização. Você irá encontrar banheiros adaptados ou não, sua avaliação, informação e distância. Basta falar localizar banheiros.`;
        const FALLBACK_REPROMPT = 'Basta dizer localizar banheiros';
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        banheiroIntentHandler,
        AdaptadoIntentHandler,
        FallbackIntentHandler,
        AboutIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
