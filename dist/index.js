"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const MySQLEvents = require('@rodrigogs/mysql-events');
const program = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = mysql_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root'
    });
    const instance = new MySQLEvents(connection, {
        startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
    });
    yield instance.start();
    instance.addTrigger({
        name: 'monitoring all statments',
        expression: 'sif_test.*',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: (e) => {
            console.log(e);
        }
    });
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
});
program()
    .then(() => console.log('Waiting for database events...'))
    .catch(console.error);
//   for creds issue use
//   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
