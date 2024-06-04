import swaggerUi from 'swagger-ui-express';
import fs from "fs";


class Docs {
    private _prevFile:any;

    public serve() {
        return swaggerUi.serve;
    }

    public getPage(version:string) {
        try{
            var doc = JSON.parse(fs.readFileSync(__dirname +`/versions/uniteDocs_v${version}.json`, 'utf-8'))
            return swaggerUi.setup(doc)
        } catch(e) {
            return swaggerUi.setup({});
        }
    }

    public getRaw(string:string) {

    }
}

export default new Docs();