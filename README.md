# Integração Contínua com Jenkins, Docker e Heroku

O projeto foi iniciado com uma aplicação simples de react somente para ser usada na integração.

[Video de apresentação para a disciplina de Gerência de Configuração](https://www.youtube.com/watch?v=_lcHn7Z3xig)

## Comandos para subir o Jenkins em um Container Docker local

Para rodar o Jenkins em um container Docker local, você pode usar o seguinte comando:

***```docker network create jenkins```***

***```docker run -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts```***

### O que cada parte do comando faz:

```docker run```: Inicia um novo container Docker.

```-p 8080:8080 -p 50000:50000```:  Mapeia as portas 8080 e 50000 do container para as mesmas portas na sua máquina local. A porta 8080 é usada para a interface web do Jenkins, e a porta 50000 é usada para comunicação entre agentes do Jenkins.

```-v jenkins_home:/var/jenkins_home```: Cria um volume Docker chamado jenkins_home e o monta em /var/jenkins_home dentro do container. Isso é usado para armazenar dados persistentes gerados pelo Jenkins.

```jenkins/jenkins:lts```: Este é o nome da imagem Docker que você quer rodar. Neste caso, é a versão LTS (Long Term Support) da imagem oficial do Jenkins.


Depois de rodar este comando, você deve ser capaz de acessar a interface web do Jenkins em ***http://localhost:8080***.

## Configurando o container Jenkins

Ao configurar o Jenkins pela primeira  vai ser colicitado a senha do administrador inicial. Essa senha é gerada automaticamente e armazenada no arquivo /var/jenkins_home/secrets/initialAdminPassword ***dentro do container Docker do Jenkins***.
Para obter essa senha, você precisa executar o seguinte comando no terminal:

***```docker exec <id_do_container_jenkins> cat /var/jenkins_home/secrets/initialAdminPassword```***

Substitua ***```<id_do_container_jenkins>```*** pelo ID do seu container Jenkins. Você pode obter o ID do container executando ***```docker ps```*** e procurando pelo container que está executando a imagem do Jenkins.

Depois de executar o comando, ele deve imprimir a senha do administrador inicial no terminal. Você pode então copiar essa senha e colá-la no campo de senha do assistente de configuração do Jenkins.

## Configurando a versão do nodejs

No projeto está configurado a versão do node 20.8.0, para evitar conflito de versões configurei uma versão do node no jenkins

Acesse: Painel de controle > Gerenciar Jenkins > Plugins

Procure por nodeJS e instale 

Após a instalação acesse:  Painel de controle > Gerenciar Jenkins > Tools > nodejs instalações

Adicione o meuNode e a versão 20.8.0 e clique em salvar.


## Configurando o Token heroku

***Encontrando o token no Heroku*** 

Crie uma conta no heroku caso não tenha uma > Acesse Account Settings e porcure por API Key > Copie o Token de API Key


***No jenkins***

Painel de controle > Gerenciar Jenkins > Credentials >  Global credentials > add credentials
No campo "Kind", selecione "Secret text".

No campo "Secret", insira a chave da API do Heroku.

No campo "ID", insira "heroku-api-key". Isso é importante porque é o ID que o Jenkins usará para encontrar a chave da API.

Clique em "OK" para salvar as credenciais.




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







