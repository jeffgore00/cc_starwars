import request from 'supertest';
import app from '../../../src/server';
import * as requestPromise from 'request-promise'

jest.setTimeout(10000);

beforeEach

describe('API routes', () => {
  it('retrieves characters', () => {
    return request(app)
      .get('/api/characters')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(res =>
        expect(res.body).toEqual([
          { name: 'Luke Skywalker', url: 'https://swapi.co/api/people/1/' },
          { name: 'Darth Vader', url: 'https://swapi.co/api/people/4/' },
          {
            name: 'Obi-wan Kenobi',
            url: 'https://swapi.co/api/people/unknown/'
          },
          { name: 'R2-D2', url: 'https://swapi.co/api/people/3/' }
        ])
      );
  });

  it('retrieves films', () => {
    return request(app)
      .get('/api/characters/1/films')
      .then(res =>
        expect(res.body).toEqual([
          {
            id: 2,
            title: 'The Empire Strikes Back',
            date: '1980-05-17',
            desc:
              'It is a dark time for the Rebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
            episodeId: 5
          },
          {
            id: 6,
            title: 'Revenge of the Sith',
            date: '2005-05-19',
            desc:
              'War! The Republic is crumbling under attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor....',
            episodeId: 3
          },
          {
            id: 3,
            title: 'Return of the Jedi',
            date: '1983-05-25',
            desc:
              'Luke Skywalker has returned to his home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...',
            episodeId: 6
          },
          {
            id: 1,
            title: 'A New Hope',
            date: '1977-05-25',
            desc:
              "It is a period of civil war. Rebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            episodeId: 4
          },
          {
            id: 7,
            title: 'The Force Awakens',
            date: '2015-12-11',
            desc:
              "Luke Skywalker has vanished. In his absence, the sinister\r\nFIRST ORDER has risen from\r\nthe ashes of the Empire\r\nand will not rest until\r\nSkywalker, the last Jedi,\r\nhas been destroyed.\r\n \r\nWith the support of the\r\nREPUBLIC, General Leia Organa\r\nleads a brave RESISTANCE.\r\nShe is desperate to find her\r\nbrother Luke and gain his\r\nhelp in restoring peace and\r\njustice to the galaxy.\r\n \r\nLeia has sent her most daring\r\npilot on a secret mission\r\nto Jakku, where an old ally\r\nhas discovered a clue to\r\nLuke's whereabouts....",
            episodeId: 7
          }
        ])
      );
  });

  it('handles errors retrieving character details - SWAPI', () => {
    // jest.spyOn(requestPromise, 'default').mockImplementationOnce(() => Promise.reject())

    // return request(app)
    //   .get('/api/characters/3/films')
    //   .then(res => {
    //     expect(res.status).toEqual(404)
    //   });
  });

  it('handles errors retrieving character films (all) - SWAPI', () => {});

  it('handles errors retrieving character films (some) - SWAPI', () => {});
});
