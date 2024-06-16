const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //define a baseUrl utilizada
    baseUrl: "http://192.168.15.66:8080",

    //define a apiURL utilizada
    apiUrl: "http://192.168.15.66:3333",

    //define o diretório dos arquivos spec.cy.js
    specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",

    //define o timeout padrão para os asserts
    defaultCommandTimeout: 5000,

    //define o timeout padrão para o carregamento de páginas
    pageLoadTimeout: 5000,

    //define o timeout padrão para as requisições
    requestTimeout: 5000,

    //define o timeout padrão para as respostas das requisições
    responseTimeout: 5000,

    //define a largura da viewPort
    viewportWidth: 1366,

    //define o comprimento da viewPort
    viewportHeight: 768,

    //define se o cypress vai rodar após alguma alteração nos arquivos (somente enquanto está aberto)
    watchForFileChanges: false,

    //define se vai tirar screnshots quando algum cenário falha
    screenshotOnRunFailure: false,

    //define se o cypress grava vídeo
    video: false,
  },
});
