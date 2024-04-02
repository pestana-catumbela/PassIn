import NlwUniteIcon from '../assets/nlw-unite-icon.svg'

export function HeaderComponent() {
    return(
        <div className="flex items-center gap-5 py-2 px-4">
            <img src={NlwUniteIcon} />

            <nav className="flex items-center gap-5">
                <a href="#" className="font-medium text-sm text-[#C4C4CC]">Eventos</a>
                <a href="#" className="font-medium text-sm">Participantes</a>
            </nav>
        </div>
    )
}
