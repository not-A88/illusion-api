import mongoose from 'mongoose';
import Config from '../configs/database.config';

class Database {
  static Connect(callback: Function): void {
    mongoose.connect(Config.localDatabase, { useUnifiedTopology: true, useNewUrlParser: true });

    mongoose.connection.on('error', (err) => {
      console.log('Failed to connect to database');
      process.exit(1);
    });

    mongoose.connection.on('open', () => {
      console.log('Database Connected...');
      callback();
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Database Disconnected...');
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Disconnecting Database...');
        process.exit(0);
      });
    });
  }
}

export = Database;
