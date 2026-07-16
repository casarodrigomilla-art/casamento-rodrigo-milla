import React, { useState, useRef, useEffect } from 'react';
import { Heart, MapPin, Calendar, Gift, Camera, Check, X, Menu, Loader, Music, Copy, Lock, User, Shirt } from 'lucide-react';

// --- CONFIGURAÇÃO DE CORES (PALETA DO CASAL) ---
const colors = {
  cream: '#FEFEF2',
  gold: '#F1CF95',
  palePink: '#EBDDD3',
  softRed: '#E1A0A0',
  sage: '#AAB18C',
  deepGreen: '#79784E',
  terracotta: '#D4865C',
  paleSage: '#CCCDB6',
};

// --- LINK DO SHEETDB (O SEU GOOGLE SHEETS) ---
// Cole aqui o link gerado pelo sheetdb.io (entre as aspas)
const SHEETDB_URL = "https://sheetdb.io/api/v1/etzl19r1qjpk4"; 

// --- BANCO DE DADOS DE CONVIDADOS (AGRUPADOS) ---
const GUEST_DATABASE = [
  {
    id: 'convite-1',
    groupName: "Eduardo e Claudia",
    members: [
      { id: 'c1-m1', name: "Eduardo Peixoto Toniolo" },
      { id: 'c1-m2', name: "Claudia Mazza Pereira Toniolo" }
    ]
  },
  {
    id: 'convite-2',
    groupName: "Juliana e Felipe",
    members: [
      { id: 'c2-m1', name: "Juliana Pereira Toniolo" },
      { id: 'c2-m2', name: "Felipe Almeida Rizzutto" }
    ]
  },
  {
    id: 'convite-3',
    groupName: "Vitória",
    members: [
      { id: 'c3-m1', name: "Vitória Mazza Pereira" }
    ]
  },
  {
    id: 'convite-4',
    groupName: "Maria e Walter",
    members: [
      { id: 'c4-m1', name: "Maria Lúcia Peixoto Toniolo" },
      { id: 'c4-m2', name: "Walter Jácomo Toniolo" }
    ]
  },
  {
    id: 'convite-5',
    groupName: "Luciana e Eduardo",
    members: [
      { id: 'c5-m1', name: "Luciana Peixoto Toniolo" },
      { id: 'c5-m2', name: "Eduardo Facchini" }
    ]
  },
  {
    id: 'convite-6',
    groupName: "Julia",
    members: [
      { id: 'c6-m1', name: "Julia Toniolo Facchini" }
    ]
  },
  {
    id: 'convite-7',
    groupName: "Fernando e Cyzinha",
    members: [
      { id: 'c7-m1', name: "Fernando Peixoto Toniolo" },
      { id: 'c7-m2', name: "Cyzinha Helms Toniolo" }
    ]
  },
  {
    id: 'convite-8',
    groupName: "Camila e Guilherme",
    members: [
      { id: 'c8-m1', name: "Camila Helms Toniolo" },
      { id: 'c8-m2', name: "Guilherme Toniolo" }
    ]
  },
  {
    id: 'convite-9',
    groupName: "Gustavo e Giovanna",
    members: [
      { id: 'c9-m1', name: "Gustavo Helms Toniolo" },
      { id: 'c9-m2', name: "Giovanna Pizzato" }
    ]
  },
  {
    id: 'convite-10',
    groupName: "Francisco e Amarilys",
    members: [
      { id: 'c10-m1', name: "Francisco Mariano Galvão Bueno" },
      { id: 'c10-m2', name: "Amarilys dos Santos Moura Galvão Bueno" }
    ]
  },
  {
    id: 'convite-11',
    groupName: "Mariana",
    members: [
      { id: 'c11-m1', name: "Mariana Galvão Bueno" }
    ]
  },
  {
    id: 'convite-12',
    groupName: "Rafael",
    members: [
      { id: 'c12-m1', name: "Rafael Galvão Bueno" }
    ]
  },
  {
    id: 'convite-13',
    groupName: "Marcia e Reinaldo",
    members: [
      { id: 'c13-m1', name: "Marcia Rizzutto" },
      { id: 'c13-m2', name: "Reinaldo Rizzutto" }
    ]
  },
  {
    id: 'convite-14',
    groupName: "Matheus e Carolina",
    members: [
      { id: 'c14-m1', name: "Matheus Almeida Rizzutto" },
      { id: 'c14-m2', name: "Carolina Simonian" }
    ]
  },
  {
    id: 'convite-15',
    groupName: "Rafaella e Gabriel",
    members: [
      { id: 'c15-m1', name: "Rafaella Bergstrom" },
      { id: 'c15-m2', name: "Gabriel Almeida Rizzutto" }
    ]
  },
  {
    id: 'convite-16',
    groupName: "João e Cristina",
    members: [
      { id: 'c16-m1', name: "João Theoto Junior" },
      { id: 'c16-m2', name: "Cristina Novaes Theoto" }
    ]
  },
  {
    id: 'convite-17',
    groupName: "Edson e Leda",
    members: [
      { id: 'c17-m1', name: "Edson Luís Molesini Burgo Guerra" },
      { id: 'c17-m2', name: "Leda Cristina Miranda Gomes" }
    ]
  },
  {
    id: 'convite-18',
    groupName: "Carlos e Maria",
    members: [
      { id: 'c18-m1', name: "Carlos Dualiby" },
      { id: 'c18-m2', name: "Maria Dualiby" }
    ]
  },
  {
    id: 'convite-19',
    groupName: "Tatiana e Ivan",
    members: [
      { id: 'c19-m1', name: "Tatiana Dualiby" },
      { id: 'c19-m2', name: "Ivan Mardones" }
    ]
  },
  {
    id: 'convite-20',
    groupName: "Thiago",
    members: [
      { id: 'c20-m1', name: "Thiago Dualiby" }
    ]
  },
  {
    id: 'convite-21',
    groupName: "Silvio e Monica",
    members: [
      { id: 'c21-m1', name: "Silvio Vendramin Camargo" },
      { id: 'c21-m2', name: "Monica de Godoy" }
    ]
  },
  {
    id: 'convite-22',
    groupName: "Mauricio",
    members: [
      { id: 'c22-m1', name: "Mauricio Bruno Pisati" }
    ]
  },
  {
    id: 'convite-23',
    groupName: "Fabio e Ana e Gabriela",
    members: [
      { id: 'c23-m1', name: "Fabio Lopes" },
      { id: 'c23-m2', name: "Ana Claudia Lopes" },
      { id: 'c23-m3', name: "Gabriela Lopes" }
    ]
  },
  {
    id: 'convite-24',
    groupName: "Fernando e Raissa",
    members: [
      { id: 'c24-m1', name: "Fernando Cervone" },
      { id: 'c24-m2', name: "Raissa Cervone" }
    ]
  },
  {
    id: 'convite-25',
    groupName: "Kika e Luciano",
    members: [
      { id: 'c25-m1', name: "Kika Ladeira" },
      { id: 'c25-m2', name: "Luciano Ladeira" }
    ]
  },
  {
    id: 'convite-26',
    groupName: "Maria e Luíz",
    members: [
      { id: 'c26-m1', name: "Maria José Rodrigues Barbosa" },
      { id: 'c26-m2', name: "Luíz Barbosa" }
    ]
  },
  {
    id: 'convite-27',
    groupName: "Elisa",
    members: [
      { id: 'c27-m1', name: "Elisa Hediger" }
    ]
  },
  {
    id: 'convite-28',
    groupName: "Kátia",
    members: [
      { id: 'c28-m1', name: "Kátia Tomanik" }
    ]
  },
  {
    id: 'convite-29',
    groupName: "Mitsi e Sérgio",
    members: [
      { id: 'c29-m1', name: "Mitsi Moya" },
      { id: 'c29-m2', name: "Sérgio Moya" }
    ]
  },
  {
    id: 'convite-30',
    groupName: "Amaury e Angela",
    members: [
      { id: 'c30-m1', name: "Amaury Sampaio Dias Chaves" },
      { id: 'c30-m2', name: "Angela Ricci Bartoloni" }
    ]
  },
  {
    id: 'convite-31',
    groupName: "Eliana e Evandro",
    members: [
      { id: 'c31-m1', name: "Eliana Cordeiro Amarante" },
      { id: 'c31-m2', name: "Evandro Scigliano Amarante" }
    ]
  },
  {
    id: 'convite-32',
    groupName: "Bruna e Bruno",
    members: [
      { id: 'c32-m1', name: "Bruna Amarante Marotta" },
      { id: 'c32-m2', name: "Bruno Munhoz Marotta" }
    ]
  },
  {
    id: 'convite-33',
    groupName: "Claudete e Oscar",
    members: [
      { id: 'c33-m1', name: "Claudete Amarante" },
      { id: 'c33-m2', name: "Oscar Amarante" }
    ]
  },
  {
    id: 'convite-34',
    groupName: "Norma",
    members: [
      { id: 'c34-m1', name: "Norma Cordeiro" }
    ]
  },
  {
    id: 'convite-35',
    groupName: "Rosely e Miguel e Cecília",
    members: [
      { id: 'c35-m1', name: "Rosely Marotta" },
      { id: 'c35-m2', name: "Miguel Marotta" },
      { id: 'c35-m3', name: "Cecília Marotta" }
    ]
  },
  {
    id: 'convite-36',
    groupName: "Paulo e Maria",
    members: [
      { id: 'c36-m1', name: "Paulo Sérgio Zoppi" },
      { id: 'c36-m2', name: "Maria Lúcia Zoppi" }
    ]
  },
  {
    id: 'convite-37',
    groupName: "João e Fernanda",
    members: [
      { id: 'c37-m1', name: "João Feniar" },
      { id: 'c37-m2', name: "Fernanda Zoppi Feniar" }
    ]
  },
  {
    id: 'convite-38',
    groupName: "Vinicius e Ada",
    members: [
      { id: 'c38-m1', name: "Vinicius Zoppi" },
      { id: 'c38-m2', name: "Ada Zoppi" }
    ]
  },
  {
    id: 'convite-39',
    groupName: "Vitor",
    members: [
      { id: 'c39-m1', name: "Vitor Zoppi" }
    ]
  },
  {
    id: 'convite-40',
    groupName: "Marco e Kátia e Julia",
    members: [
      { id: 'c40-m1', name: "Marco Aurélio Andrade" },
      { id: 'c40-m2', name: "Kátia Andrade" },
      { id: 'c40-m3', name: "Julia Andrade" }
    ]
  },
  {
    id: 'convite-41',
    groupName: "Rafael e Carol",
    members: [
      { id: 'c41-m1', name: "Rafael Pignocchi" },
      { id: 'c41-m2', name: "Carol Andrade Pignocchi" }
    ]
  },
  {
    id: 'convite-42',
    groupName: "Rui",
    members: [
      { id: 'c42-m1', name: "Rui Kimura" }
    ]
  },
  {
    id: 'convite-43',
    groupName: "Marianne",
    members: [
      { id: 'c43-m1', name: "Marianne Zelaszny" }
    ]
  },
  {
    id: 'convite-44',
    groupName: "André e Giorgia",
    members: [
      { id: 'c44-m1', name: "André Scigliano" },
      { id: 'c44-m2', name: "Giorgia Scigliano" }
    ]
  },
  {
    id: 'convite-45',
    groupName: "Gabriel e Maria",
    members: [
      { id: 'c45-m1', name: "Gabriel Jacintho" },
      { id: 'c45-m2', name: "Maria Lúcia Jacintho" }
    ]
  },
  {
    id: 'convite-46',
    groupName: "Claudia",
    members: [
      { id: 'c46-m1', name: "Claudia Pereira" }
    ]
  },
  {
    id: 'convite-47',
    groupName: "Sergio e Consuelo",
    members: [
      { id: 'c47-m1', name: "Sergio Cordeiro" },
      { id: 'c47-m2', name: "Consuelo Cordeiro" }
    ]
  },
  {
    id: 'convite-48',
    groupName: "Vitor e Patricia",
    members: [
      { id: 'c48-m1', name: "Vitor Cordeiro" },
      { id: 'c48-m2', name: "Patricia Cordeiro" }
    ]
  },
  {
    id: 'convite-49',
    groupName: "Arnaldo e Cristina",
    members: [
      { id: 'c49-m1', name: "Arnaldo Ricca" },
      { id: 'c49-m2', name: "Cristina Cotrim Ricca" }
    ]
  },
  {
    id: 'convite-50',
    groupName: "Giulia",
    members: [
      { id: 'c50-m1', name: "Giulia Ricca" }
    ]
  },
  {
    id: 'convite-51',
    groupName: "Francisco e Cynthia",
    members: [
      { id: 'c51-m1', name: "Francisco Carballido" },
      { id: 'c51-m2', name: "Cynthia Carballido" }
    ]
  },
  {
    id: 'convite-52',
    groupName: "Oduvaldo e Lídia",
    members: [
      { id: 'c52-m1', name: "Oduvaldo Lacava" },
      { id: 'c52-m2', name: "Lídia Lacava" }
    ]
  },
  {
    id: 'convite-53',
    groupName: "Rogério e Sandra",
    members: [
      { id: 'c53-m1', name: "Rogério Nerguesian" },
      { id: 'c53-m2', name: "Sandra Nerguesian" }
    ]
  },
  {
    id: 'convite-54',
    groupName: "Adriano e Fabiana",
    members: [
      { id: 'c54-m1', name: "Adriano Nasser" },
      { id: 'c54-m2', name: "Fabiana Nasser" }
    ]
  },
  {
    id: 'convite-55',
    groupName: "Onofra",
    members: [
      { id: 'c55-m1', name: "Onofra Donizzete da Silva" }
    ]
  },
  {
    id: 'convite-56',
    groupName: "Cleosangela",
    members: [
      { id: 'c56-m1', name: "Cleosangela Santos" }
    ]
  },
  {
    id: 'convite-57',
    groupName: "José e Silvia",
    members: [
      { id: 'c57-m1', name: "José Luiz Orlando" },
      { id: 'c57-m2', name: "Silvia Orlando" }
    ]
  },
  {
    id: 'convite-58',
    groupName: "Lucília e Wagner",
    members: [
      { id: 'c58-m1', name: "Lucília Groff" },
      { id: 'c58-m2', name: "Wagner Groff" }
    ]
  },
  {
    id: 'convite-59',
    groupName: "Cesar e Edméia",
    members: [
      { id: 'c59-m1', name: "Cesar Mattos" },
      { id: 'c59-m2', name: "Edméia Mattos" }
    ]
  },
  {
    id: 'convite-60',
    groupName: "Luis",
    members: [
      { id: 'c60-m1', name: "Luis Fernando Barcelos" }
    ]
  },
  {
    id: 'convite-61',
    groupName: "Amanda",
    members: [
      { id: 'c61-m1', name: "Amanda Santos" }
    ]
  },
  {
    id: 'convite-62',
    groupName: "Valéria",
    members: [
      { id: 'c62-m1', name: "Valéria Canopé" }
    ]
  },
  {
    id: 'convite-63',
    groupName: "Andréia",
    members: [
      { id: 'c63-m1', name: "Andréia Severina Verçosa" }
    ]
  },
  {
    id: 'convite-64',
    groupName: "Gabriela e Giovani",
    members: [
      { id: 'c64-m1', name: "Gabriela Quass Federighi" },
      { id: 'c64-m2', name: "Giovani Nicola" }
    ]
  },
  {
    id: 'convite-65',
    groupName: "Muriel e Luciano",
    members: [
      { id: 'c65-m1', name: "Muriel Dentes" },
      { id: 'c65-m2', name: "Luciano Piva" }
    ]
  },
  {
    id: 'convite-66',
    groupName: "Betina e Fernando",
    members: [
      { id: 'c66-m1', name: "Betina Le Grazie" },
      { id: 'c66-m2', name: "Fernando Faulbel" }
    ]
  },
  {
    id: 'convite-67',
    groupName: "Felipe e Lara",
    members: [
      { id: 'c67-m1', name: "Felipe Freire Pinto" },
      { id: 'c67-m2', name: "Lara Iabrudi" }
    ]
  },
  {
    id: 'convite-68',
    groupName: "Carolina e Gian",
    members: [
      { id: 'c68-m1', name: "Carolina Ejnisman" },
      { id: 'c68-m2', name: "Gian Franco Nardini" }
    ]
  },
  {
    id: 'convite-69',
    groupName: "Antonia e João",
    members: [
      { id: 'c69-m1', name: "Antonia Godoy Delgado" },
      { id: 'c69-m2', name: "João Buk" }
    ]
  },
  {
    id: 'convite-70',
    groupName: "Bruna e Caio",
    members: [
      { id: 'c70-m1', name: "Bruna Camargo" },
      { id: 'c70-m2', name: "Caio Servidio" }
    ]
  },
  {
    id: 'convite-71',
    groupName: "Mariana e Marco",
    members: [
      { id: 'c71-m1', name: "Mariana Pires" },
      { id: 'c71-m2', name: "Marco Antonio Funchal Filho" }
    ]
  },
  {
    id: 'convite-72',
    groupName: "Arthur e Nathalia",
    members: [
      { id: 'c72-m1', name: "Arthur Gallo Dagir" },
      { id: 'c72-m2', name: "Nathalia De Vivo" }
    ]
  },
  {
    id: 'convite-73',
    groupName: "Caio e Rafaella",
    members: [
      { id: 'c73-m1', name: "Caio Prado" },
      { id: 'c73-m2', name: "Rafaella Pinesi" }
    ]
  },
  {
    id: 'convite-74',
    groupName: "Giovanni e Luiza",
    members: [
      { id: 'c74-m1', name: "Giovanni Carletti" },
      { id: 'c74-m2', name: "Luiza Crisci" }
    ]
  },
  {
    id: 'convite-75',
    groupName: "Maria",
    members: [
      { id: 'c75-m1', name: "Maria Silveira" }
    ]
  },
  {
    id: 'convite-76',
    groupName: "Aline",
    members: [
      { id: 'c76-m1', name: "Aline Alexa" }
    ]
  },
  {
    id: 'convite-77',
    groupName: "Nicole e Fabricio",
    members: [
      { id: 'c77-m1', name: "Nicole Ladeira Macias" },
      { id: 'c77-m2', name: "Fabricio Macias" }
    ]
  },
  {
    id: 'convite-78',
    groupName: "Luise e Alexandre",
    members: [
      { id: 'c78-m1', name: "Luise Prado" },
      { id: 'c78-m2', name: "Alexandre Luz" }
    ]
  },
  {
    id: 'convite-79',
    groupName: "Lucca e Lira",
    members: [
      { id: 'c79-m1', name: "Lucca Nunes Zidan" },
      { id: 'c79-m2', name: "Lira Sevla" }
    ]
  },
  {
    id: 'convite-80',
    groupName: "Luciana",
    members: [
      { id: 'c80-m1', name: "Luciana Rebelo Carnevalli" }
    ]
  },
  {
    id: 'convite-81',
    groupName: "Vinicius e Marcella",
    members: [
      { id: 'c81-m1', name: "Vinicius Genosa" },
      { id: 'c81-m2', name: "Marcella Gonçalves" }
    ]
  },
  {
    id: 'convite-82',
    groupName: "Lucia e João",
    members: [
      { id: 'c82-m1', name: "Lucia Andrade" },
      { id: 'c82-m2', name: "João Olzensk" }
    ]
  },
  {
    id: 'convite-83',
    groupName: "Carolina e Pietro",
    members: [
      { id: 'c83-m1', name: "Carolina Chalita Soares" },
      { id: 'c83-m2', name: "Pietro Vicente" }
    ]
  },
  {
    id: 'convite-84',
    groupName: "Michel e Camila",
    members: [
      { id: 'c84-m1', name: "Michel Chieregato" },
      { id: 'c84-m2', name: "Camila Miyuki" }
    ]
  },
  {
    id: 'convite-85',
    groupName: "Tatyana e Augusto",
    members: [
      { id: 'c85-m1', name: "Tatyana Moya Hulse" },
      { id: 'c85-m2', name: "Augusto Hulse" }
    ]
  },
  {
    id: 'convite-86',
    groupName: "Lucca e Mayara",
    members: [
      { id: 'c86-m1', name: "Lucca Moya" },
      { id: 'c86-m2', name: "Mayara Bruck" }
    ]
  },
  {
    id: 'convite-87',
    groupName: "Thiago e Desireé",
    members: [
      { id: 'c87-m1', name: "Thiago Fagundes" },
      { id: 'c87-m2', name: "Desireé Barros" }
    ]
  },
  {
    id: 'convite-88',
    groupName: "Gustavo e Gabriela",
    members: [
      { id: 'c88-m1', name: "Gustavo Yugo Kuada" },
      { id: 'c88-m2', name: "Gabriela Campos" }
    ]
  },
  {
    id: 'convite-89',
    groupName: "Victor e Thaís",
    members: [
      { id: 'c89-m1', name: "Victor Eiki Uemura" },
      { id: 'c89-m2', name: "Thaís Miky" }
    ]
  },
  {
    id: 'convite-90',
    groupName: "Emmanuel e Bruna",
    members: [
      { id: 'c90-m1', name: "Emmanuel Barreira Ferraro" },
      { id: 'c90-m2', name: "Bruna Pinhati" }
    ]
  },
  {
    id: 'convite-91',
    groupName: "Eduardo e Dyanna",
    members: [
      { id: 'c91-m1', name: "Eduardo Torres" },
      { id: 'c91-m2', name: "Dyanna Martins" }
    ]
  },
  {
    id: 'convite-92',
    groupName: "Lucas e Isabella",
    members: [
      { id: 'c92-m1', name: "Lucas Bicudo Ting" },
      { id: 'c92-m2', name: "Isabella de Andrade" }
    ]
  },
  {
    id: 'convite-93',
    groupName: "André",
    members: [
      { id: 'c93-m1', name: "André Miki Hediger" }
    ]
  },
  {
    id: 'convite-94',
    groupName: "Bruno e Natalia",
    members: [
      { id: 'c94-m1', name: "Bruno Takeshi Hediger" },
      { id: 'c94-m2', name: "Natalia Soffner" }
    ]
  },
  {
    id: 'convite-95',
    groupName: "João e Ana",
    members: [
      { id: 'c95-m1', name: "João Pedro Cervone" },
      { id: 'c95-m2', name: "Ana Caroline Victorio" }
    ]
  },
  {
    id: 'convite-96',
    groupName: "Ana e André",
    members: [
      { id: 'c96-m1', name: "Ana Clara Cervone " },
      { id: 'c96-m2', name: "André Gutilla" }
    ]
  },
  {
    id: 'convite-97',
    groupName: "Victor e Leticia",
    members: [
      { id: 'c97-m1', name: "Victor Barbosa Ladeira" },
      { id: 'c97-m2', name: "Leticia de Oliveira Schoedl" }
    ]
  },
  {
    id: 'convite-98',
    groupName: "Gabriela",
    members: [
      { id: 'c98-m1', name: "Gabriela Brogim" }
    ]
  },
  {
    id: 'convite-99',
    groupName: "Nina e Pedro",
    members: [
      { id: 'c99-m1', name: "Nina Ceccon" },
      { id: 'c99-m2', name: "Pedro Sartori" }
    ]
  },
  {
    id: 'convite-100',
    groupName: "Thainá e Danilo",
    members: [
      { id: 'c100-m1', name: "Thainá Toledo" },
      { id: 'c100-m2', name: "Danilo Kai" }
    ]
  },
  {
    id: 'convite-101',
    groupName: "Pamelly",
    members: [
      { id: 'c101-m1', name: "Pamelly Melo" }
    ]
  },
  {
    id: 'convite-102',
    groupName: "Raul",
    members: [
      { id: 'c102-m1', name: "Raul Gallo Dagir" }
    ]
  },
  {
    id: 'convite-103',
    groupName: "Esther",
    members: [
      { id: 'c103-m1', name: "Esther Gallo Dagir" }
    ]
  },
  {
    id: 'convite-104',
    groupName: "Jessica e Matheus",
    members: [
      { id: 'c104-m1', name: "Jessica Nogueira" },
      { id: 'c104-m2', name: "Matheus Della Rosa" }
    ]
  },
  {
    id: 'convite-105',
    groupName: "Tatiana e Luigi",
    members: [
      { id: 'c105-m1', name: "Tatiana Schott" },
      { id: 'c105-m2', name: "Luigi Grimaldi" }
    ]
  },
  {
    id: 'convite-106',
    groupName: "Vitor e Julia",
    members: [
      { id: 'c106-m1', name: "Vitor Eller Grando" },
      { id: 'c106-m2', name: "Julia Pollo" }
    ]
  },
  {
    id: 'convite-107',
    groupName: "Eduardo",
    members: [
      { id: 'c107-m1', name: "Eduardo Tirta" }
    ]
  },
  {
    id: 'convite-108',
    groupName: "Rafaella e Lucas",
    members: [
      { id: 'c108-m1', name: "Rafaella Goldlust" },
      { id: 'c108-m2', name: "Lucas Sá" }
    ]
  },
  {
    id: 'convite-109',
    groupName: "André e Juliana",
    members: [
      { id: 'c109-m1', name: "André Diomede" },
      { id: 'c109-m2', name: "Juliana Bastos" }
    ]
  },
  {
    id: 'convite-110',
    groupName: "Bruna e Lucas",
    members: [
      { id: 'c110-m1', name: "Bruna Mazzolani" },
      { id: 'c110-m2', name: "Lucas Napoleão" }
    ]
  },
  {
    id: 'convite-111',
    groupName: "Fabiana",
    members: [
      { id: 'c111-m1', name: "Fabiana Smaira" }
    ]
  },
  {
    id: 'convite-112',
    groupName: "Graziela e André",
    members: [
      { id: 'c112-m1', name: "Graziela Ashida" },
      { id: 'c112-m2', name: "André Palmieri" }
    ]
  },
  {
    id: 'convite-113',
    groupName: "Franceso e Maria",
    members: [
      { id: 'c113-m1', name: "Franceso Cervetto" },
      { id: 'c113-m2', name: "Maria Eduarda Padilha" }
    ]
  },
  {
    id: 'convite-114',
    groupName: "Alexandra e Affonso",
    members: [
      { id: 'c114-m1', name: "Alexandra Figueiredo" },
      { id: 'c114-m2', name: "Affonso Junior" }
    ]
  },
  {
    id: 'convite-115',
    groupName: "Bruno e Mayara",
    members: [
      { id: 'c115-m1', name: "Bruno Mendes" },
      { id: 'c115-m2', name: "Mayara Benigno de Souza" }
    ]
  },
  {
    id: 'convite-116',
    groupName: "Pedro",
    members: [
      { id: 'c116-m1', name: "Pedro Proto" }
    ]
  },
  {
    id: 'convite-117',
    groupName: "Renato e Sabrina",
    members: [
      { id: 'c117-m1', name: "Renato Cruz" },
      { id: 'c117-m2', name: "Sabrina Kaibara" }
    ]
  },
  {
    id: 'convite-118',
    groupName: "Johnny e Johnny",
    members: [
      { id: 'c118-m1', name: "Johnny Matioli" },
      { id: 'c118-m2', name: "Johnny Matioli (namorada)" }
    ]
  },
  {
    id: 'convite-119',
    groupName: "Fernando e Luciana",
    members: [
      { id: 'c119-m1', name: "Fernando Seiryo Kuteken" },
      { id: 'c119-m2', name: "Luciana Nakao Kuteken" }
    ]
  },
  {
    id: 'convite-120',
    groupName: "João e Luiza",
    members: [
      { id: 'c120-m1', name: "João Renato Albanese Filho" },
      { id: 'c120-m2', name: "Luiza Travalini" }
    ]
  },
  {
    id: 'convite-121',
    groupName: "Eduardo",
    members: [
      { id: 'c121-m1', name: "Eduardo Bortoletto" }
    ]
  },
  {
    id: 'convite-122',
    groupName: "Pedro e Camila",
    members: [
      { id: 'c122-m1', name: "Pedro Passarelli" },
      { id: 'c122-m2', name: "Camila Chagas" }
    ]
  },
  {
    id: 'convite-123',
    groupName: "Caroline",
    members: [
      { id: 'c123-m1', name: "Caroline Prandini" }
    ]
  },
  {
    id: 'convite-124',
    groupName: "Guilherme e Nathalia",
    members: [
      { id: 'c124-m1', name: "Guilherme Campelo" },
      { id: 'c124-m2', name: "Nathalia Senciales" }
    ]
  },
  {
    id: 'convite-125',
    groupName: "Fábio e Camila",
    members: [
      { id: 'c125-m1', name: "Fábio Haddad" },
      { id: 'c125-m2', name: "Camila Ayres" }
    ]
  },
  {
    id: 'convite-126',
    groupName: "Laura",
    members: [
      { id: 'c126-m1', name: "Laura Dal Fabbro" }
    ]
  },
  {
    id: 'convite-127',
    groupName: "Matheus e Giovanna",
    members: [
      { id: 'c127-m1', name: "Matheus Janjão" },
      { id: 'c127-m2', name: "Giovanna Zinanni" }
    ]
  },
  {
    id: 'convite-128',
    groupName: "Lucca e Paloma",
    members: [
      { id: 'c128-m1', name: "Lucca Rafael Cruz" },
      { id: 'c128-m2', name: "Paloma Durães" }
    ]
  },
  {
    id: 'convite-129',
    groupName: "Joana",
    members: [
      { id: 'c129-m1', name: "Joana Françozo" }
    ]
  },
  {
    id: 'convite-130',
    groupName: "Paula",
    members: [
      { id: 'c130-m1', name: "Paula Barclay" }
    ]
  },
  {
    id: 'convite-131',
    groupName: "Antonio",
    members: [
      { id: 'c131-m1', name: "Antonio Julian" }
    ]
  },
  {
    id: 'convite-132',
    groupName: "Guilherme",
    members: [
      { id: 'c132-m1', name: "Guilherme Pires" }
    ]
  },
  {
    id: 'convite-133',
    groupName: "Guilherme e Ana",
    members: [
      { id: 'c133-m1', name: "Guilherme Lopes" },
      { id: 'c133-m2', name: "Ana Carolina" }
    ]
  },
  {
    id: 'convite-134',
    groupName: "Raphael e Beatriz",
    members: [
      { id: 'c134-m1', name: "Raphael Kenji Ogushi" },
      { id: 'c134-m2', name: "Beatriz Lima" }
    ]
  },
  {
    id: 'convite-135',
    groupName: "Marcelo",
    members: [
      { id: 'c135-m1', name: "Marcelo Untem" }
    ]
  },
  {
    id: 'convite-136',
    groupName: "Cecília",
    members: [
      { id: 'c136-m1', name: "Cecília Meireles" }
    ]
  },
  {
    id: 'convite-137',
    groupName: "Gustavo e Gabriela",
    members: [
      { id: 'c137-m1', name: "Gustavo Groff" },
      { id: 'c137-m2', name: "Gabriela Cyrulin" }
    ]
  },
  {
    id: 'convite-138',
    groupName: "Eduarda",
    members: [
      { id: 'c138-m1', name: "Eduarda Nunes" }
    ]
  },
  {
    id: 'convite-139',
    groupName: "Maria e Pedro",
    members: [
      { id: 'c139-m1', name: "Maria Cecília Carvalho" },
      { id: 'c139-m2', name: "Pedro Assad" }
    ]
  },
  {
    id: 'convite-140',
    groupName: "Diogo e Mayara",
    members: [
      { id: 'c140-m1', name: "Diogo Hideki" },
      { id: 'c140-m2', name: "Mayara Gobbi" }
    ]
  },
  {
    id: 'convite-141',
    groupName: "Luciano e Isabela",
    members: [
      { id: 'c141-m1', name: "Luciano Chaparin" },
      { id: 'c141-m2', name: "Isabela Sordi" }
    ]
  },
  {
    id: 'convite-142',
    groupName: "Ludmila e Jorge",
    members: [
      { id: 'c142-m1', name: "Ludmila Manzan" },
      { id: 'c142-m2', name: "Jorge Flesch" }
    ]
  },
  {
    id: 'convite-143',
    groupName: "Mariana",
    members: [
      { id: 'c143-m1', name: "Mariana Fujimura" }
    ]
  },
  {
    id: 'convite-144',
    groupName: "Rodrigo e Julia",
    members: [
      { id: 'c144-m1', name: "Rodrigo Calil" },
      { id: 'c144-m2', name: "Julia Abdu" }
    ]
  },
  {
    id: 'convite-145',
    groupName: "Marco e Marco",
    members: [
      { id: 'c145-m1', name: "Marco França" },
      { id: 'c145-m2', name: "Marco França (esposa)" }
    ]
  },
  {
    id: 'convite-146',
    groupName: "Daria e Daria",
    members: [
      { id: 'c146-m1', name: "Daria Muzychenko" },
      { id: 'c146-m2', name: "Daria Muzychenko (marido)" }
    ]
  },
  {
    id: 'convite-147',
    groupName: "Rafael e Carolina",
    members: [
      { id: 'c147-m1', name: "Rafael Kaminski" },
      { id: 'c147-m2', name: "Carolina Yumi" }
    ]
  },
  {
    id: 'convite-148',
    groupName: "Gabriela",
    members: [
      { id: 'c148-m1', name: "Gabriela Magalhães Ferreira" }
    ]
  },
  {
    id: 'convite-149',
    groupName: "Mark e Kathleen",
    members: [
      { id: 'c149-m1', name: "Mark Halliden" },
      { id: 'c149-m2', name: "Kathleen Halliden" }
    ]
  },
  {
    id: 'convite-150',
    groupName: "Ciro e Letícia",
    members: [
      { id: 'c150-m1', name: "Ciro Costa" },
      { id: 'c150-m2', name: "Letícia " }
    ]
  }
];

const App = () => {
  // --- ESTADOS DE SEGURANÇA E NAVEGAÇÃO ---
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Começa bloqueado
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- ESTADOS DO RSVP EM GRUPO ---
  const [rsvpStep, setRsvpStep] = useState('search');
  const [searchName, setSearchName] = useState('');
  const [foundGroup, setFoundGroup] = useState<{id: string, groupName: string, members: {id: string, name: string}[]} | null>(null);
  
  // Guarda as respostas individuais: { 'c1-m1': 'yes', 'c1-m2': 'no' }
  const [attendance, setAttendance] = useState<Record<string, string>>({}); 
  const [message, setMessage] = useState('');
  
  // Estado para controlar o loading do envio para a planilha
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ESTADO DA MÚSICA ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- FUNÇÃO DE LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Senha simples para o frontend (idealmente validado no backend)
    if (passwordInput.toLowerCase() === 'amor2026') {
      setIsAuthenticated(true);
    } else {
      setLoginError(true);
    }
  };

  // --- CONTROLE DE MÚSICA ---
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // --- LÓGICA RSVP ---
  const handleSearchGuest = (e) => {
    e.preventDefault();
    const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const searchNorm = normalize(searchName);
    
    // Procura se o nome digitado bate com algum membro de algum grupo
    const group = GUEST_DATABASE.find(g => 
      g.members.some(m => normalize(m.name).includes(searchNorm)) && searchName.length > 2
    );

    if (group) {
      setFoundGroup(group);
      // Reseta as respostas anteriores se houver
      setAttendance({}); 
      setRsvpStep('form');
    } else {
      setRsvpStep('notFound');
    }
  };

  const handleAttendanceChange = (memberId, status) => {
    setAttendance(prev => ({ ...prev, [memberId]: status }));
  };

  const handleSubmitRSVP = async (e) => {
    e.preventDefault();
    
    // Verifica se todos os membros foram respondidos
    if (foundGroup && Object.keys(attendance).length < foundGroup.members.length) {
        alert("Por favor, selecione Sim ou Não para todos os convidados listados.");
        return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const dataFormatada = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Prepara os dados para o Google Sheets (uma linha por convidado)
    const respostasParaPlanilha = foundGroup.members.map(member => ({
        Data: dataFormatada,
        Grupo: foundGroup.groupName,
        Convidado: member.name,
        Status: attendance[member.id] === 'yes' ? 'Confirmado' : 'Não vai',
        Mensagem: message
    }));

    try {
        if (SHEETDB_URL === "SUA_URL_DO_SHEETDB_AQUI") {
            // Se ainda não colocou a URL, apenas simula o sucesso para não quebrar o site
            setTimeout(() => {
                setIsSubmitting(false);
                setRsvpStep('success');
            }, 1500);
            return;
        }

        // Envia para o SheetDB
        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: respostasParaPlanilha })
        });

        if (response.ok) {
            setRsvpStep('success');
        } else {
            alert("Ocorreu um erro ao enviar a confirmação. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Erro na comunicação com o banco de dados:", error);
        alert("Ocorreu um erro de conexão. Por favor, tente novamente.");
    } finally {
        setIsSubmitting(false);
    }
  };

  // --- TELA DE BLOQUEIO (SENHA) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-center border-t-4" style={{ borderColor: colors.deepGreen }}>
          <img src="/bicicleta_casal.png" alt="Bicicleta" className="h-16 mx-auto mb-4 object-contain mix-blend-multiply" />
          <h1 className="text-3xl font-serif mb-2" style={{ color: colors.deepGreen }}>Rodrigo & Milla</h1>
          <p className="text-gray-500 mb-8">Área restrita aos convidados. Por favor, digite a senha do convite.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Senha de acesso"
              className="w-full p-4 border rounded-lg text-center text-lg tracking-widest focus:ring-2 outline-none"
              style={{ borderColor: loginError ? colors.softRed : colors.sage }}
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
            />
            {loginError && <p className="text-sm" style={{ color: colors.softRed }}>Senha incorreta. Tente "amor2026".</p>}
            <button 
              type="submit"
              className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.deepGreen }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- SITE PRINCIPAL ---
  return (
    <div className="min-h-screen font-sans selection:bg-[#D4865C] selection:text-white" style={{ backgroundColor: colors.cream }}>
      
      {/* MUSIC PLAYER FLOATING BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        {isPlaying && (
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-[#D4865C] animate-fadeIn">
             <span className="text-xs font-bold uppercase tracking-wider text-[#6E7C5A]">♫ Just the Two of Us</span>
          </div>
        )}
        <button 
          onClick={toggleMusic}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:animate-none transition-transform hover:scale-110"
          style={{ backgroundColor: colors.terracotta, color: 'white' }}
        >
          {isPlaying ? <Music size={24} /> : <div className="relative"><Music size={24} /><div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></div></div>}
        </button>
        {/* MÚSICA: Para a versão final, substitua o src abaixo pelo arquivo 'just-the-two-of-us.mp3' na pasta public */}
        <audio ref={audioRef} loop src="/just-the-two-of-us.mp3" />
      </div>

      {/* --- HEADER / NAV --- */}
      <nav className="fixed w-full z-40 bg-opacity-90 backdrop-blur-md shadow-sm transition-all duration-300" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <img src="/monograma.png" alt="Monograma" className="h-12 object-contain mix-blend-multiply" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {['A História', 'O Dia', 'Traje', 'Presentes', 'RSVP'].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollTo(item === 'A História' ? 'story' : item === 'O Dia' ? 'details' : item === 'Traje' ? 'dresscode' : item === 'Presentes' ? 'registry' : 'rsvp')}
                  className="text-sm uppercase tracking-wider hover:text-[#D4865C] transition-colors"
                  style={{ color: colors.deepGreen }}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollTo('rsvp')}
                className="px-6 py-2 rounded-full text-white transition-transform transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: colors.terracotta }}
              >
                Confirmar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: colors.deepGreen }}>
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-[#FEFEF2] shadow-xl border-t border-[#AAB18C]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {['A História', 'O Dia', 'Traje', 'Presentes', 'RSVP'].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollTo(item === 'A História' ? 'story' : item === 'O Dia' ? 'details' : item === 'Traje' ? 'dresscode' : item === 'Presentes' ? 'registry' : 'rsvp')}
                  className="block px-3 py-2 text-base font-medium w-full text-center hover:bg-[#F1CF95] hover:bg-opacity-20 rounded-md"
                  style={{ color: colors.deepGreen }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fundo Aquarela Botânico */}
        <div 
          className="absolute inset-0 z-0 opacity-50 mix-blend-multiply filter blur-[3px]" 
          style={{ backgroundImage: "url('/aquarela_botanico.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FEFEF2]/40 via-transparent to-[#FEFEF2]"></div>

        <div className="relative z-10 text-center px-4 mt-16">
          <img src="/bicicleta_casal.png" alt="Bicicleta" className="h-16 md:h-24 mx-auto mb-4 object-contain mix-blend-multiply" />
          <p className="text-lg md:text-xl uppercase tracking-[0.2em] mb-4 font-bold" style={{ color: colors.terracotta }}>Vamos nos casar</p>
          
          <img src="/assinatura.png" alt="Rodrigo e Milla" className="h-24 md:h-40 mx-auto mb-6 object-contain mix-blend-multiply drop-shadow-sm" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg md:text-2xl font-light" style={{ color: colors.deepGreen }}>
            <span className="flex items-center gap-2"><Calendar size={20} /> 18 de Outubro de 2026</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-2"><MapPin size={20} /> 15:00h • São Paulo</span>
          </div>
          
          <div className="mt-12">
            <button 
              onClick={() => scrollTo('details')}
              className="animate-bounce"
              style={{ color: colors.terracotta }}
            >
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </button>
          </div>
        </div>
      </section>

      {/* --- STORY / INTRO --- */}
      <section id="story" className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-10 h-10 mx-auto mb-6" style={{ color: colors.terracotta }} />
          <h2 className="text-3xl md:text-5xl font-serif mb-8" style={{ color: colors.deepGreen }}>Nossa História</h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-80" style={{ color: colors.deepGreen }}>
            Rodrigo Pereira Toniolo & Milla Cordeiro Amarante.<br/>
            Construindo nossos sonhos, tijolo por tijolo, e agora celebrando a fundação mais importante de todas: nossa família. 
            O Botânico Quintal reflete a leveza que queremos para nossa vida a dois.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
             {['/casal1.PNG', '/casal2.PNG', '/casal3.PNG'].map((src, i) => (
               <div key={i} className={`aspect-[3/4] rounded-t-full bg-[#EBDDD3] relative overflow-hidden shadow-lg border-2 border-[#EBDDD3] group ${i === 1 ? 'md:-translate-y-6' : ''}`}>
                 <img src={src} alt={`Casal ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"></div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- EVENT DETAILS --- */}
      <section id="details" className="py-20 px-4 relative">
        <div className="absolute inset-0 opacity-10 pattern-dots" style={{ backgroundImage: `radial-gradient(${colors.sage} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-6xl mx-auto bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-xl border border-[#AAB18C]">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Informações */}
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-8" style={{ color: colors.deepGreen }}>O Grande Dia</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1"><Calendar className="w-6 h-6" style={{ color: colors.terracotta }} /></div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">18 de Outubro de 2026</h3>
                    <p className="text-gray-600">Domingo, às 15:00 horas</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><MapPin className="w-6 h-6" style={{ color: colors.terracotta }} /></div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">Botânico Quintal</h3>
                    <p className="text-gray-600">Av. Imperatriz Leopoldina, 681</p>
                    <p className="text-gray-600">Alto de Pinheiros – São Paulo/SP</p>
                    <a 
                      href="https://maps.app.goo.gl/zNWQFPv1v6r8nQEPA" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg text-sm font-bold border transition-colors hover:bg-[#D4865C] hover:text-white"
                      style={{ borderColor: colors.terracotta, color: colors.terracotta }}
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa Embedado (Simulação visual) */}
            <div className="h-64 md:h-full bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.433293675684!2d-46.73292492383256!3d-23.542901361276226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8e1e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sAv.%20Imperatriz%20Leopoldina%2C%20681%20-%20Vila%20Leopoldina%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005305-011!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 title="Mapa Botânico Quintal"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- DRESS CODE / TRAJE --- */}
      <section id="dresscode" className="py-16 px-4 bg-[#F9F9F4]">
        <div className="max-w-4xl mx-auto text-center">
          <Shirt className="w-10 h-10 mx-auto mb-4" style={{ color: colors.deepGreen }} />
          <h2 className="text-3xl md:text-4xl font-serif mb-6" style={{ color: colors.deepGreen }}>Dress Code</h2>
          <p className="text-lg text-gray-700 mb-8">
            Para celebrarmos com elegância e conforto, o traje sugerido é <strong className="uppercase">Social Completo</strong>.
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
             {/* Card Mulheres */}
             <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-[#EBDDD3]">
               <h3 className="font-serif text-xl mb-4" style={{ color: colors.terracotta }}>Para Elas</h3>
               <p className="text-gray-600 text-sm mb-4">Vestidos longos ou midi em tecidos fluidos. Apostem em tons pastéis ou vibrantes. Evitem o branco e off-white.</p>
               <div className="h-48 bg-[#FEFEF2] rounded border border-dashed border-[#AAB18C] flex items-center justify-center">
                 <span className="text-xs text-gray-400 italic">Croqui / Inspiração Vestido</span>
               </div>
             </div>
             
             {/* Card Homens */}
             <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-[#EBDDD3]">
               <h3 className="font-serif text-xl mb-4" style={{ color: colors.deepGreen }}>Para Eles</h3>
               <p className="text-gray-600 text-sm mb-4">Terno completo e gravata. Cores como azul marinho, cinza grafite ou preto são perfeitas para a ocasião.</p>
               <div className="h-48 bg-[#FEFEF2] rounded border border-dashed border-[#AAB18C] flex items-center justify-center">
                  <span className="text-xs text-gray-400 italic">Croqui / Inspiração Terno</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- REGISTRY / LISTA DE PRESENTES --- */}
      <section id="registry" className="py-20 px-4" style={{ backgroundColor: colors.palePink }}>
        <div className="max-w-4xl mx-auto text-center">
          <Gift className="w-10 h-10 mx-auto mb-4" style={{ color: colors.deepGreen }} />
          <h2 className="text-3xl md:text-5xl font-serif mb-6" style={{ color: colors.deepGreen }}>Lista de Presentes</h2>
          
          <div className="bg-white p-8 rounded-xl shadow-lg mb-10 mx-auto max-w-3xl">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic font-serif">
              "Estamos muito felizes em compartilhar esse momento com vocês! 
              Como já estamos montando nosso primeiro lar juntos, optamos por uma lista de presentes 'à moda antiga' e também opções virtuais.
              Seus presentes chegarão em um momento perfeito para nos ajudar a construir nosso cantinho."
            </p>
          </div>

          {/* LOJAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Camicado', url: '#', color: '#fff' },
              { name: 'Mickey Presentes', url: '#', color: '#fff' },
              { name: 'Fast Shop', url: '#', color: '#fff' }
            ].map((store, i) => (
              <a 
                key={i} 
                href={store.url}
                target="_blank"
                rel="noreferrer"
                className="group p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2"
              >
                <Gift size={24} style={{ color: colors.terracotta }} />
                <h3 className="font-bold uppercase text-gray-700">{store.name}</h3>
                <span className="text-xs text-[#D4865C]">Ver lista</span>
              </a>
            ))}
          </div>

          {/* ÁREA PIX */}
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border-2 border-dashed relative overflow-hidden" style={{ borderColor: colors.gold }}>
            <div className="absolute top-0 left-0 bg-[#F1CF95] text-[#6E7C5A] text-xs font-bold px-3 py-1 rounded-br-lg">
              OPÇÃO PRÁTICA
            </div>
            <h3 className="text-2xl font-serif mb-4" style={{ color: colors.deepGreen }}>Presente via PIX</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Se preferir contribuir de forma prática para a nossa lua de mel e montagem da casa, 
              você pode usar a chave PIX abaixo ou ler o QR Code.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
              {/* QR Code Placeholder */}
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border">
                <span className="text-xs text-gray-400">QR Code PIX</span>
              </div>
              
              <div className="text-left w-full md:w-auto">
                <p className="text-xs uppercase text-gray-400 font-bold mb-1">Chave Pix (E-mail ou CPF)</p>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <code className="text-[#6E7C5A] font-mono select-all">rodrigoemilla@casamento.com</code>
                  <button 
                    onClick={() => navigator.clipboard.writeText('rodrigoemilla@casamento.com')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Copiar chave"
                  >
                    <Copy size={16} className="text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Banco: Nubank | Titular: Rodrigo Toniolo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RSVP SECTION (AGORA COM GRUPOS E SHEETDB) --- */}
      <section id="rsvp" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-4" style={{ color: colors.deepGreen }}>RSVP</h2>
          <p className="mb-8" style={{ color: colors.deepGreen }}>Por favor, confirme sua presença até 18 de Setembro de 2026.</p>

          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4" style={{ borderColor: colors.terracotta }}>
            
            {/* STEP 1: SEARCH */}
            {rsvpStep === 'search' && (
              <form onSubmit={handleSearchGuest} className="space-y-6">
                <div>
                  <label className="block text-left text-sm font-semibold mb-2" style={{ color: colors.deepGreen }}>
                    Digite seu nome ou sobrenome
                  </label>
                  <input 
                    type="text" 
                    required
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Ex: Ciro Costa"
                    className="w-full p-4 border rounded-lg focus:ring-2 outline-none transition-all bg-[#FEFEF2]"
                    style={{ borderColor: colors.sage, color: colors.deepGreen }}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-lg text-white font-bold tracking-widest text-lg hover:opacity-90 transition-opacity uppercase"
                  style={{ backgroundColor: colors.deepGreen }}
                >
                  Procurar Convite
                </button>
              </form>
            )}

            {/* ERROR: NOT FOUND */}
            {rsvpStep === 'notFound' && (
              <div className="text-center animate-fadeIn py-8">
                <div className="text-[#D4865C] mb-4 text-5xl">?</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Convite não localizado</h3>
                <p className="text-gray-600 mb-6">
                  Não encontramos este nome na lista. Tente digitar apenas o primeiro nome ou sobrenome.
                </p>
                <button 
                  onClick={() => {
                    setSearchName(''); // Limpa o campo de busca anterior
                    setRsvpStep('search');
                  }}
                  className="w-full py-4 rounded-lg text-white font-bold tracking-widest text-lg hover:opacity-90 transition-opacity uppercase"
                  style={{ backgroundColor: colors.terracotta }}
                >
                  Procure novamente
                </button>
              </div>
            )}

            {/* STEP 2: FORM EM GRUPO COM SHEETDB */}
            {rsvpStep === 'form' && foundGroup && (
              <form onSubmit={handleSubmitRSVP} className="space-y-8 text-left animate-fadeIn">
                <div className="border-b pb-4 border-gray-200 text-center">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Encontramos o seu convite</p>
                  <h3 className="text-2xl font-serif font-bold" style={{ color: colors.deepGreen }}>{foundGroup.groupName}</h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700 text-sm font-semibold">Por favor, confirme a presença para cada convidado abaixo:</p>
                  
                  {foundGroup.members.map((member) => (
                    <div key={member.id} className="bg-[#FEFEF2] p-4 rounded-lg border border-[#AAB18C] flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <span className="text-lg text-gray-800 font-serif font-bold">{member.name}</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleAttendanceChange(member.id, 'yes')}
                          className={`flex-1 md:flex-none px-6 py-2 rounded border font-bold transition-all ${attendance[member.id] === 'yes' ? 'bg-[#6E7C5A] text-white border-[#6E7C5A]' : 'bg-white text-gray-500 border-gray-300 hover:border-[#6E7C5A]'}`}
                        >
                          Sim
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAttendanceChange(member.id, 'no')}
                          className={`flex-1 md:flex-none px-6 py-2 rounded border font-bold transition-all ${attendance[member.id] === 'no' ? 'bg-[#D4865C] text-white border-[#D4865C]' : 'bg-white text-gray-500 border-gray-300 hover:border-[#D4865C]'}`}
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Deixe uma mensagem para os noivos (Opcional)</label>
                  <textarea 
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#AAB18C] outline-none"
                    placeholder="Escreva algo especial..."
                  ></textarea>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg text-white font-bold tracking-widest text-lg uppercase flex items-center justify-center transition-opacity ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                    style={{ backgroundColor: colors.deepGreen }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin mr-2" size={24} />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Confirmação"
                    )}
                  </button>

                  <button 
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setSearchName('');
                      setFoundGroup(null);
                      setRsvpStep('search');
                    }}
                    className="w-full py-3 rounded-lg font-bold tracking-widest text-sm uppercase transition-colors border-2 bg-transparent hover:bg-gray-50"
                    style={{ color: colors.deepGreen, borderColor: colors.deepGreen }}
                  >
                    Não é o seu convite? Voltar
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS (COM BOTÃO DE PRESENTES) */}
            {rsvpStep === 'success' && (
              <div className="text-center py-8 animate-fadeIn flex flex-col items-center">
                <div className="w-16 h-16 bg-[#AAB18C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: colors.deepGreen }}>Muito Obrigado!</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  Sua confirmação foi registrada com sucesso. Mal podemos esperar para celebrar com você!
                </p>

                {/* BOTÃO PARA LISTA DE PRESENTES */}
                <div className="bg-[#FEFEF2] p-6 rounded-lg border border-[#EBDDD3] w-full">
                  <p className="text-gray-600 text-sm mb-4 font-semibold">
                    Já que está aqui, que tal dar uma olhada na nossa lista de presentes?
                  </p>
                  <button 
                    onClick={() => {
                      scrollTo('registry');
                    }}
                    className="w-full py-3 rounded text-white font-bold tracking-widest text-sm hover:opacity-90 transition-all uppercase flex items-center justify-center gap-2"
                    style={{ backgroundColor: colors.terracotta }}
                  >
                    <Gift size={18} />
                    Ver Lista de Presentes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center text-white flex flex-col items-center" style={{ backgroundColor: colors.deepGreen }}>
        <img src="/monograma.png" alt="Monograma" className="h-16 mb-4 object-contain brightness-0 invert opacity-90" />
        <p className="mb-8 opacity-80">18 . 10 . 2026</p>
        <div className="text-sm opacity-60">
          <p>Feito com amor • São Paulo, Brasil</p>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
