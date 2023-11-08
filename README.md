# Integração Contínua com Jenkins, Docker e Heroku

O projeto foi iniciado com uma aplicação simples de react somente para ser usada na integração.

## Benefícios da integração contínua

- Indentificação rápida de problemas no código.
- Redução de erros e bugs em produção
- Melhoria na qualidade do código
- Aumento da eficiência do desenvolvimento
- Redução de custos e tempo de desenvolvimento

## Tecnologias utilizadas

- [X] React
- [X] npm
- [X] Docker
- [X] Heroku
- [X] Jenkins

## Etapas do pipeline

1. Contrução da image docker
   
     O arquivo Dockerfile gera uma image docker que ao rodar o pipeline é gerado um container para o deploy no heroku simplificando assim o deploy da aplicação.
      Na hora da implementação ocorreu um erro no log do jenkins informando que o node version estava em conflito, uma forma de resolver é adicionar a versão do node no dockerfile, jenkinsfile e também no jenkins.
   
2. Login do Heroku e envio da image docker para o Heroku 

   Nessa etapa além de adicionar o stage de login e registro do heroku no pipeline, também foi necessário adicionar o token do Heroku nas configurações do Jenkins
   ***```enviroment { HEROKU_API_KEY = credentials('heroku-api-key')```***
   
   Gere o heroku-api-key acessando no Heroku o ```account-settings > API key```
   
   Adicione o token gerado no jenkins em Painel de ```controle > Gerenciar Jenkins > Credentials``` com o nome heroku-api-key
   
3. Libera a image docker no heroku
 
4. Executa os testes unitários do aplicatio React no container Docker

  O teste unitário precisa ser feito dentro do container 

5. Geração do relatório de cobertura de testes





