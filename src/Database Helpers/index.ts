import { ConnectionPool, Request } from 'mssql';
import mssql from 'mssql';
import { sqlConfig } from '../config/Index';
export class DbHelper {
    private pool: Promise<ConnectionPool>;
    constructor() {
        this.pool = mssql.connect(sqlConfig)
    }
    createRequest(emptyRequest: Request, data: { [x: string]: string | number }) {
        const keys = Object.keys(data);
        keys.map(key => {
            emptyRequest.input(key, mssql.VarChar(255), data[key])
        })
        return emptyRequest
    }

    async exec(storedprocedure: string, data: { [x: string]: string | number }) {
        
    const emptyRequest = ((await this.pool).request())
    const request = this.createRequest(emptyRequest, data)
    let results = await request.execute(storedprocedure)
    return results
    }

   async query(queryString: string) {
    return (await ((await this.pool).request().execute(queryString)))
    }
}