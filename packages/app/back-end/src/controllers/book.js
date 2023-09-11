
import Router from "koa-router";
import { RequestMethod, Controller, RequestMapping } from "../utils/decorator";

import mockList from '../mock';

@Controller('/book')
export default class BookController {
    @RequestMapping(RequestMethod.GET, '/list')
    async getBookList(ctx, next) {
        // ctx.body = 'get book list';
        ctx.body = mockList;

    }

    @RequestMapping(RequestMethod.POST, '/add')
    async addBook(ctx, next) {
        ctx.body = 'add book';
    }
}
