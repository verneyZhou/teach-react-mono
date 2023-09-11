
import React, {FC} from "react";
import {Outlet} from "react-router-dom";
import Navigation from "@/components/navigation";
// import Card from '@/components/card';
import {Card} from '@proz/react-omponents'; // 组件库引入
import Tabpages from './tabPages';
import Creation from './siderPages/Creation';
import AdvancedBtns from './siderPages/AdvancedBtns';
import SelfFunctions from './siderPages/SelfFunctions';


const Home: FC = () => {
    return (
        <div className=" bg-gray-100">
            <Navigation className=" top-0 sticky" />
            <div className="mx-auto w-320 max-w-7xl flex my-2 px-20">
                <Card className="w-2/3">
                    <Tabpages/>
                </Card>
                <div className="flex-1 w-1/3">
                    <Card clasName=" w-full">
                        <Creation />
                    </Card>
                    <Card className=" w-full">
                        <AdvancedBtns />
                    </Card>
                    <Card className=" w-full sticky top-16">
                        <SelfFunctions />
                    </Card>
                </div>
            </div>
            
        </div>
    )
}


export default Home;