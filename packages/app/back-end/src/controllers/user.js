
import Router from "koa-router";
import { RequestMethod, Controller, RequestMapping } from "../utils/decorator";
import UserServices from '../services/userServices';


@Controller('/user')
export default class UserController {
    @RequestMapping(RequestMethod.GET, '/all')
    async getUser(ctx, next) {
        ctx.body = 'get all user';
    }

    @RequestMapping(RequestMethod.POST, '/del')
    async delete(ctx, next) {
        ctx.body = 'delelte user';
    }


    // 登录接口： /user/login
    @RequestMapping(RequestMethod.POST, '/login')
    async login(ctx, next) {
        const {body} = ctx.request;
        console.log('===body: ', body);
        const userServices = new UserServices();
        ctx.body = await userServices.validate(body);
    }
}
