import { NavLink } from './nav-link';
import NlwUniteIcon from '../assets/nlw-unite-icon.svg';

export function HeaderComponent() {
    const navLinkInfos = [
        { title: 'Eventos', link: '/eventos' },
        { title: 'Participantes', link: '/participantes' }
    ];

    return(
        <div className="flex items-center gap-5 py-2 px-4">
            <img src={NlwUniteIcon} />

            <nav className="flex items-center gap-5">
                {navLinkInfos.map((navLinkInfo, indexNavLinkInfo) => {
                    return(
                        <NavLink key={indexNavLinkInfo} href={navLinkInfo.link}>{navLinkInfo.title}</NavLink>
                    );
                })}
            </nav>
        </div>
    )
}
