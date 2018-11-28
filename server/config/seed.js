/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'TestUser-1',
          email: 'test1@example.com',
          password: 'test'
        }, 
        {
          provider: 'local',
          name: 'TestUser-2',
          email: 'test2@example.com',
          password: 'test'
        },
        {
          provider: 'local',
          name: 'TestUser-3',
          email: 'test3@example.com',
          password: 'test'
        },
        {
          provider: 'local',
          name: 'TestUser-4',
          email: 'test4@example.com',
          password: 'test'
        },
        {
          provider: 'local',
          name: 'TestUser-5',
          email: 'test5@example.com',
          password: 'test'
        },
        {
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        },
        {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
