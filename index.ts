
import mysql from 'mysql';
const MySQLEvents = require('@rodrigogs/mysql-events');
import ora from 'ora';

const program = async () => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root'
    });
  
    const instance = new MySQLEvents(connection, {
      startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
    });
  
    await instance.start();
  
    instance.addTrigger({
      name: 'monitoring all statments',
      expression: 'sif_test.*', // listen to TEST database !!!
      statement: MySQLEvents.STATEMENTS.ALL, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
      onEvent: (e: any) => {
        console.log(e);
      }
    });
  
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
  };

  program()
  .then(() => console.log('Waiting for database events...'))
  .catch(console.error);


//   for creds issue use
//   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
