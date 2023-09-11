import { getRandom } from "@proz/utils";


type Func = () => string;

const getStr: Func = () => {
    const str: string = 'hello world';
    return str;
}



console.log('====getRandom', getRandom() + getStr());
