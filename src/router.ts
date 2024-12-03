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
        res.write("<form action='/create-user' method='POST'><input type='text'/><button type='submit'>Add User</button></form>");
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

}

const writeHeader = (res: ServerResponse, title : string) =>  {
    res.write(`<head><title>${title}</title></head>`);
}

const writeListItem = (res: ServerResponse, listItem: string) => {
    res.write(`<li>${listItem}</li>`);
}