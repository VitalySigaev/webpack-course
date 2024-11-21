import { useState } from 'react'
import classes from './App.module.scss'
import { Link, Outlet } from 'react-router-dom';
import avatarPng from '@/assets/d6e72e17c2c7d64d8efc8eb20657df5e.png'
import avatarJpg from '@/assets/avto_kapot_dverki_bagajnik_zerkala_30.jpg'
import AvatarSvg from '@/assets/alien-svgrepo-com.svg'

function TODO(a: number) {
    console.log('trtrtr');

}

export const App = () => {
    const [count, setCount] = useState<number>(0);
    const increment = () => setCount(prev => prev + 1)
    // TODO()
    // if (__PLATFORM__ === 'desktop') {
    //     return <div>ISDESKTOPPLATFORM</div>
    // }

    // if (__PLATFORM__ === 'mobile') {
    //     return <div>ISMOBILEPLATFORM</div>
    // }

    // if (__ENV__ === 'development') {
    //     // addDevtools() просто пример - нерабочий
    // }

    return (
        <>
            <div data-testid="App">
                <img src={avatarPng} alt="" style={{ width: 50, height: 50 }} />
                <img src={avatarJpg} alt="" style={{ width: 50, height: 50 }} />

            </div>
            <div>Platform={__PLATFORM__}</div>
            <div>   <AvatarSvg className={classes.icon} width={50} height={50} /></div>
            <Link to={'/about'}>about</Link>
            <Link to={'/shop'}>shop</Link>
            <h1>{count}</h1>
            <button className={classes.button} onClick={increment}><span>inc </span></button>
            <Outlet />
            {/* нужен для отрисовки страницы при роутинге */}
        </>

    )
}

