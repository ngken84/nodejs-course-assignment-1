import { IncomingMessage, ServerResponse } from "http"

const userList : string[] = ['Ken', 'Ryu', 'Sol'];

export const requestHandler = (req : IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if(url === '/' && method === "GET") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        writeHeader(res, "Welcome!");
        res.write("<body>");
        res.write("<h1>Welcome to Node JS Assignment 1</h1>");
        res.write("<form action='/create-user' method='POST'><input type='text' name='username'/><button type='submit'>Add User</button></form>");
        res.write("<div>");
        res.write("<a href='/users'>Go to Users</a>");
        res.write("</div>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    
    if(url === '/users' && method === 'GET') {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        writeHeader(res, "Users!");
        res.write("<body>")
        res.write("<a href='/'>Go to Home</a>");
        res.write("<div>");
        res.write("<ul>");
        userList.forEach((value: string) => {
            writeListItem(res, value);
        })
        res.write("</ul>");
        res.write("</div>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }

    if(url === '/create-user' && method === "POST") {
        const body: Uint8Array[] = [];
        req.on('data', (chunk: Uint8Array) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const userName = parsedBody.split("=")[1];
            userList.push(userName);
            res.statusCode = 302;
            res.setHeader('Location', "/");
            return res.end();
        });
    }

}

const writeHeader = (res: ServerResponse, title : string) =>  {
    res.write(`<head><title>${title}</title></head>`);
}

const writeListItem = (res: ServerResponse, listItem: string) => {
    res.write(`<li>${listItem}</li>`);
}